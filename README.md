Firefox Addon: Set Aside Tabs
=====

What is this:
---

A copy of Edge feature: set aside tabs. This is a very useful feature to organize tabs and work spaces. Introducing it as an addon before firefox implement it officially.

Differences from Edge version
----

- Because the firefox sidebar is too narrow for the feature, I put the set aside tabs in a separate tab.

- It only set aside normal tabs that is not pinned, so if the firefox preferrence page is open, it is not set aside.

- Bookmark function is not included. I don't think it is very useful. If you think so, let me know.

How to build the extension
----

1. clone the repo to your local machine
2. go to root directory of the repo and run
```
npm install
```
3. build extension:
  - for dev build: run the follow command and it create extension files in `build` folder
  ```
  npm run build
  ```
  - for prod build: run the follow command and it create extension files in `release` folder
  ```
  npm run release
  ```
4. to test the extension, follow [Temporary installation in Firefox](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)