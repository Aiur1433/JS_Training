import Redis from "ioredis";

export class Client {

    client: Redis;

    constructor(host: string = '127.0.0.1', port: number = 6379) {
        this.client = new Redis();
    }

    set(key: string, value: string) {
        this.client.set(key, value);
    }

    get(key: string) {
        return this.client.get(key);
    }

    sadd(key: string, value: any) {
        this.client.sadd(key, value);
    }

    smembers(key: string) {
        return this.client.smembers(key);
    }
}