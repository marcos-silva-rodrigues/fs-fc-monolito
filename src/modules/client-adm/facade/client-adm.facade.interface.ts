import Address from "../../@shared/domain/value-object/address"

export interface AddClientFacadeInputDto {
  id?: string
  name: string
  email: string
  document: string
  address: Address
}

export interface FindClientFacadeOutputDto {
  id: string
  name: string
  email: string
  document: string
  address: Address
  createdAt: Date
  updatedAt: Date
}

export default interface ClientAdmFacadeInterface {
    find(productId: string): Promise<FindClientFacadeOutputDto>
    add(product: AddClientFacadeInputDto): Promise<void>
}