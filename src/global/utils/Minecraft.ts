export interface MinecraftPoint {
    x: number,
    y: number,
    z: number,
}

// In blocks/s
export const ESpeed = {
    WALKING: 4.317,
    SPRINTING: 5.612,
    JUMP_SPRINT: 7.143,
    HORSE_AVG: 9,
    HORSE_MAX: 14.23
}

export default class MinecraftUtils {

    static getDistanceBetweenPoints(destination: MinecraftPoint, from: MinecraftPoint) {
        const {x: destX, z: destZ} = destination;
        const {x: fromX, z: fromZ} = from;

        let xDistance = Math.abs(destX - fromX);
        let zDistance = Math.abs(destZ - fromZ);

        return Math.hypot(xDistance, zDistance);
    }

    static calculateTimeToDestination(distance: number) {
        let ret = {};
        Object.keys(ESpeed).forEach(key => {
            ret[key] = Math.floor(distance / ESpeed[key]);
        })
        return ret;
    }
}