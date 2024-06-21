import fs, {PathOrFileDescriptor, WriteFileOptions} from "fs";
import path from "path";
import axios from "axios";

interface Agent {
    name: string;
    alignment: string[];
    job: number;
    race: string;
    rarity: number;
    author: string;
}

class ArkData {
    version: string;
    agents: Agent[];
}

enum Profession {
    PIONEER, WARRIOR, TANK, SNIPER, CASTER, MEDIC, SUPPORT, SPECIAL
}

enum Job {
    pioneer = 0, charger, tactician, bearer, agent,
    centurion = 100, fighter, artsfghter, instructor, lord, sword, musha, fearless, reaper, librator, crusher, hammer,
    protector = 200, guardian, unyield, artsprotector, duelist, shotprotector, fortress,
    fastshot = 300, closerange, aoesniper, longrange, reaperrange, siegesniper, bombarder, hunter, loopshooter,
    corecaster = 400, splashcaster, funnel, phalanx, mystic, chain, blastcaster, primcaster,
    physician = 500, ringhealer, healer, incantationmedic, wandermedic, chainhealer,
    slower = 600, underminer, bard, blessing, summoner, craftsman, ritualist,
    executor = 700, pusher, stalker, hookmaster, geek, merchant, traper, dollkeeper,
}

const GAME_VERSION = "GAME_VERSION";
const AGENT_LIST = "AGENT_LIST";
const PATH = './ArkData.json';
const getData = async () => {
    //版本信息
    let res = await getGameDataByLangAndName('gamedata_const');
    console.log("获取版本信息成功");
    let data = res.data;
    const version = data.dataVersion;
    const arkDataJson = fs.readFileSync(PATH, 'utf8');
    const arkData = JSON.parse(arkDataJson);
    let oldVersion = arkData.version
    console.log("当前版本：" + oldVersion);
    console.log("最新版本：" + version);
    if (version !== oldVersion) {
        //更新数据
        //加载干员信息
        let agents = await loadData();
        const data: ArkData = {version: version, agents: agents}
        //写入json
        const file = path.resolve(PATH)
        writeFileByUser(file, JSON.stringify(data), {encoding: 'utf8'})
    }
}

const loadData = async () => {
    //从Kengxxiao/ArknightsGameData仓库中获取对应服务器目录的excel文件夹下同名文件

    // 阵营信息
    const teams = loadTeam();

    // 皮肤信息，主要拿默认皮的画师
    const skins = loadSkin();

    // 档案信息，主要拿种族
    const handbooks = loadHandbook();

    return Promise.all([teams, skins, handbooks]).then(async (results) => {
        let values = await Promise.all([loadCharacter(results[0], results[1], results[2]), loadCharacterExtend(results[0], results[1], results[2])]);
        let agents = values[0];
        agents.push(...values[1]);
        return agents;
    });
}

const loadHandbook = async () => {
    let res = await getGameDataByLangAndName('handbook_info_table');
    console.log("获取档案信息成功")
    let data = res.data.handbookDict;

    let handbooks = {};
    for (const k of Object.keys(data)) {
        let storyText = data[k].storyTextAudio[0].stories[0].storyText;

        const regex = /【种族】(.*)\n/;
        const match = storyText.match(regex);
        let race = '';
        if (match) {
            race = match[1];
        }
        handbooks[k] = {race: race};
    }

    return handbooks;
}

const loadTeam = async () => {
    let res = await getGameDataByLangAndName('handbook_team_table');
    console.log("获取阵营信息成功")
    let data = res.data;
    const teams = {};
    for (const k of Object.keys(data)) {
        teams[k] = data[k].powerName;
    }
    return teams;
}

const loadSkin = async () => {
    let res = await getGameDataByLangAndName('skin_table');
    console.log("获取皮肤信息成功")
    let data = res.data;
    const skins = {};
    for (const k of Object.keys(data.buildinEvolveMap)) {
        let skinId = data.buildinEvolveMap[k][0];
        if (data.charSkins[skinId].displaySkin.drawerList == null) {
            //预备干员没有皮肤 跳过
            continue;
        }
        skins[k] = data.charSkins[skinId].displaySkin.drawerList[0];
    }
    for (const k of Object.keys(data.buildinPatchMap)) {
        let charList = data.buildinPatchMap[k];
        for (const id of Object.keys(charList)) {
            let skinId = charList[id];

            skins[k] = data.charSkins[skinId].displaySkin.drawerList[0];
        }
    }
    return skins;
}

const loadCharacterExtend = async (teams, skins, handbooks) => {
    let res = await getGameDataByLangAndName('char_patch_table');
    console.log("获取干员升变信息成功")
    let data = res.data;

    const patchMap = {};
    for (const id of Object.keys(data.infos)) {
        for (const p of data.infos[id].tmplIds) {
            patchMap[p] = id;
        }
    }

    const agents = [];
    for (const id of Object.keys(data.patchChars)) {
        const agent = loadAgentsData(patchMap[id], data.patchChars[id], teams, skins, handbooks);
        if (agent !== null) {
            agents.push(agent);
        }
    }
    return agents;
}

const loadCharacter = async (teams, skins, handbooks) => {
    // 角色基本信息，里面包了召唤物和临时干员之类的，会自动跳过
    let res = await getGameDataByLangAndName('character_table');
    console.log("获取干员信息成功")
    let data = res.data;

    const agents = [];
    for (const id of Object.keys(data)) {
        const agent = loadAgentsData(id, data[id], teams, skins, handbooks);
        if (agent !== null) {
            agents.push(agent);
        }
    }
    return agents;
}

const loadAgentsData = (id, data, teams, skins, handbooks) => {
    if (data.displayNumber == null) {
        // 非正常干员，跳过
        return null;
    }
    let rarity = getRarity(data.rarity);

    let tempTeam = [];
    if (data.teamId !== undefined && data.teamId !== null) {
        tempTeam.push(teams[data.teamId]);
    }
    if (data.groupId !== undefined && data.groupId !== null) {
        tempTeam.push(teams[data.groupId]);
    }
    if (data.nationId !== undefined && data.nationId !== null) {
        tempTeam.push(teams[data.nationId]);
    }

    let agent: Agent = {
        name: data.name.trim(),
        alignment: [...tempTeam.join('-').replace('−', '-').split('-').filter(v => v)],
        job: Number(Job[data.subProfessionId.trim()]),
        race: handbooks[id].race,
        rarity: rarity,
        author: skins[id],
    };

    return agent;
}

const getRarity = (rarity: any): number => {
    let result = 0;
    if (rarity != null) {
        if (isNaN(rarity)) {
            result = parseInt(rarity.substring("TIER_".length)) - 1;
        } else {
            result = rarity;
        }
    }
    return result;
}

export const getGameDataByLangAndName = (jsonName: string) => {
    return axios.get(`https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/zh_CN/gamedata/excel/${jsonName}.json`).catch((err) => {
        console.log(`${jsonName}文件 获取失败 重试`)
        console.log(JSON.stringify(err))
        return getGameDataByLangAndName(jsonName)
    })
}


function writeFileByUser(filePath: PathOrFileDescriptor,
                         data: string | NodeJS.ArrayBufferView,
                         options?: WriteFileOptions,) {
    if (fs.existsSync(filePath.toString())) {
    } else {
        mkdir(filePath);
    }
    fs.writeFileSync(filePath, data, options)
}

function mkdir(filePath) {
    const dirCache = {};
    const arr = filePath.split('\\');
    let dir = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (!dirCache[dir] && !fs.existsSync(dir)) {
            dirCache[dir] = true;
            fs.mkdirSync(dir);
        }
        dir = dir + '/' + arr[i];
    }
    fs.writeFileSync(filePath, '')
}


const app = () => {
    getData().then(() => console.log("数据加载完成"));
}


app();