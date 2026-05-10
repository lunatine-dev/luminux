import { UserModel } from "@models/User";
import { getDummyHash, hash, verify } from "@services/auth/password";
import { AppError } from "@core/errors";
import { issueRefreshToken } from "@services/auth/session-service";

export const processLocalAuth = async (email: string, password: string, ip: string, ua: string) => {
    if (!password) throw new AppError("Invalid email or password", 401);

    const user = await UserModel.findOne({
        email,
    }).select("+password");

    const dbHash = user && user.password ? user.password : getDummyHash();
    const isValid = await verify(dbHash, password);

    if (!user || !user.password || !isValid) {
        throw new AppError("Invalid email or password", 401);
    }

    const { rawToken, sessionId } = await issueRefreshToken(user._id, ip, ua);

    return {
        dbUser: user,
        sessionId,
        refreshToken: rawToken,
    };
};

export const processLocalOnboarding = async (email: string, password: string) => {
    // First check if the email already exists
    const user = await UserModel.findOne({
        email,
    });

    if (user) throw new AppError("Email already in use", 400);

    // Hash the password
    const hashedPassword = await hash(password);

    // Add user to database
    return await UserModel.create({
        email,
        password: hashedPassword,
    });
};
