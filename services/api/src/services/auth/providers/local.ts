import { UserModel } from "@models/User";
import { getDummyHash, verify } from "@services/auth/password";
import { AppError } from "@core/errors";
import { issueRefreshToken } from "@services/auth/session-service";

export const processLocalAuth = async (email: string, password: string, ip: string, ua: string) => {
    const user = await UserModel.findOne({
        email,
    }).select("+password");

    const dbHash = user ? user.password : getDummyHash();
    const isValid = await verify(dbHash, password);

    if (!user || !isValid) throw new AppError("Invalid email or password", 401);

    const { rawToken, sessionId } = await issueRefreshToken(user._id, ip, ua);

    return {
        dbUser: user,
        sessionId,
        refreshToken: rawToken,
    };
};
