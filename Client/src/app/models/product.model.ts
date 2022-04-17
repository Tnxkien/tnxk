export interface Product {
    _id: string,
    name: string,
    slug: string,
    id_parent: string,
    id_user: string,
    price: number,
    img: Array<String>,
    content: string,
    status: boolean,
    trash: boolean,
    date_created: string,
    date_updated: string,
}
