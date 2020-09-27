export class Entity {
  id: string
  createdAt: string
  updatedAt: string
}
export class User extends Entity {
  firstName: string
  password: string
  gender: string
  lastName: string
  phone: string
  token?: string
  birthDay: string
  status: string
  username: string
  department: string
}

export class Department extends Entity {
  users: User[]
  name: string
  status: string
}
