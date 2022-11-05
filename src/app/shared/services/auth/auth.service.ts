import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/users';
import { UserService } from '../user/user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersStorage: IUser[] = []
  constructor(private userService: UserService) { }

  checkUser(user: IUser):boolean {
    const isUserExists = this.usersStorage.find((el: IUser) => el.login === user.login)
    let isUserSavedInStore = window.localStorage.getItem('user_' + user?.login)
    let userInStore: IUser = <IUser>{}
    if (isUserSavedInStore) {
      userInStore = JSON.parse(isUserSavedInStore)
    }

   if (isUserExists) {
      return isUserExists.psw === user.psw
    } else if (userInStore?.login){
      return userInStore.psw === user.psw
    }

    return false
 }

 isUserExists(user: IUser):boolean {
  const isUserExists = this.usersStorage.find((el: IUser) => el.login === user.login)

  return !!isUserExists
}

 setUser(user: IUser):void {
  const isUserExists = this.usersStorage.find((el: IUser) => el.login === user.login)
  if (!isUserExists && user?.login) {
    this.usersStorage.push(user)
  }
 }

//test purpose
//  auth(): boolean {
//     console.log('click')
//     return true
//   }
}
