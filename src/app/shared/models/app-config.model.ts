export interface IAppConfig {
    apiEndpoints: {
        register: string,
        login: string,
        refreshToken: string,
        logout: string,
        recipe: string,
        voteSuffix: string,
        popularRecipesSuffix: string,
        recentRecipesSuffix: string,
        userProfile: string
    }
}