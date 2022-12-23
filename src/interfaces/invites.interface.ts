export interface IInvites{
    _id?: string
    name: string,
    lastname: string,
    family: string,
}

export interface IFamilies{
    _id?: string
    family: string,
    total: number,
    confirm: boolean,
    qrcode: string
    integrants: Array<IInvites>
}

export interface IUpdateName {
    family: string,
}

export interface IResposnseCSV {
    message: string,
    url: string
}

export interface IServices {
    invite: {} | IInvites;
    family: {} | IFamilies
    families: IFamilies[];
    getFamilies: () => Promise<void>;
    getFamily: (id: string) => Promise<void>;
    createFamily: (family: IUpdateName) => Promise<void>;
    updateFamily: (_id: string, updates: IUpdateName) => Promise<void>;
    deleteFamily: (_id: string) => Promise<void>;
    getInvite: (id: string) => Promise<void>;
    addMemeber: (invite: IInvites) => Promise<void>
    deleteMember: (idFamily: string, idInvite: string)=>Promise<void>
    getCSV: ()=>Promise<string | undefined>
  }