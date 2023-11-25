import { test as base, request } from "@playwright/test";
import ProfilePage from "../../src/pageObjects/profilePage/profilePage.js";
import WelcomePage from "../pageObjects/welcomePage/WelcomePage.js";
import {USERS} from "../data/dict/users.js";
import { STORAGE_STATE_USER_PATH } from "../data/storageState.js";
import GaragePage from "../pageObjects/panel/garagePage/GaragePage.js";

export const test = base.extend({
  headerLinks: ['Garage', 'Fuel expenses', 'Instructions'],
  userInfo: USERS.JD,
  userProfilePage: async ({browser}, use)=>{
      const ctx = await browser.newContext({
          storageState: STORAGE_STATE_USER_PATH
      })
      const page = await ctx.newPage()
      const profilePage = new ProfilePage(page)
      await profilePage.navigate()

      // before test

      await use(profilePage)

      //after test
  },
      userGaragePage: async ({browser}, use)=>{
          const ctx = await browser.newContext({
              storageState: STORAGE_STATE_USER_PATH
          })
          const page = await ctx.newPage()
          const garagePage = new GaragePage(page)
          await garagePage.navigate()
          await use(garagePage)

          await ctx.close()
      },
      userAPIClient: async ({},use)=>{
          const ctx = await request.newContext({
              storageState: STORAGE_STATE_USER_PATH
          })
          await use(ctx)

         await ctx.dispose()
      },
  managerProfilePage: async ({page}, use)=>{
      const welcomePage = new WelcomePage(page)
      await welcomePage.navigate()
      const popup = await welcomePage.openSignInPopup()
      await popup.signIn({
          email: USERS.JD.email, // manager credentials
          password: USERS.JD.password
      })

      const profilePage = new ProfilePage(page)
      await profilePage.navigate()
      await use(profilePage)
  },
  }
)