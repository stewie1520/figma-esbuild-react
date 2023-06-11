import axios from "axios"

export class AuthApi {
  static readonly prefix = "/auth"

  static async login(account: string, password: string): Promise<{ token: string }> {
    const response = await axios.post(this.prefix + "/login", {
      account,
      password,
    })

    return response.data
  }

  static async loginFake(account: string, password: string): Promise<{ token: string }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ token: "40f5b1d0-df8f-42d4-a682-9014da2807b9" })
      }, 2000)
    })
  }
}