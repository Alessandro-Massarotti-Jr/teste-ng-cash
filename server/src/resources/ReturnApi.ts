import { Response } from "express"

interface MessageReturnInterface {
    error: boolean;
    message: string | null;
    developerMessage: string | null | undefined;
    data: object | null;
    statusHTTP: number;
}

export class ReturnAPI {

    public static messageReturn(res: Response, data: MessageReturnInterface) {

        return res.status(data.statusHTTP).json(data);
    }

}