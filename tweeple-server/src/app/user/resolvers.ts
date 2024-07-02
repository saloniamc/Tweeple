const queries = {
    verifyGoogleToken: async (parents:any, {token}:{token: String}) => {
        const googleToken = token;
    },
};

export const resolvers = { queries };