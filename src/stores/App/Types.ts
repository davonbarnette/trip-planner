export interface TUser {
    activated: number,
    blocked: boolean | null,
    email: string,
    firstName: string,
    id: number,
    lastName: string,
    role: TUserRole,
    user_group: number,
    username: string,
}

export interface TCustomizedFormControls<T> {
    value?: T,
    onChange?: (value: T) => void,
}

export interface TCoordinates {
    lat: number,
    lng: number,
    address:string,
}

export interface IImage {
    alternativeText: string,
    caption: string,
    created_at: string,
    formats: any,
    hash: string,
    height: number,
    id: number,
    mime: string,
    name: string,
    previewUrl: string,
    provider: string,
    provider_metadata: string,
    size: number,
    updated_at: string,
    url: string,
    width: number,
}

export interface TSignupValues {
    username?: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
}


export interface TUserRole {
    description: string,
    id: number,
    name: string,
    type: string,
}

export interface TLoginValues {
    username: string,
    password: string,
}

export interface TLoginResponse {
    jwt: string,
    user: TUser,
}

export interface TSignupResponse {
    jwt: string,
    user: TUser,
}

export const LSAuthTokenKey = 'corl_jwt';