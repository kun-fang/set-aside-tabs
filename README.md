Firefox Addon: Set Aside Tabs
=====

What is this:
---

A copy of Edge feature: set aside tabs. This is a very useful feature to organize tabs and work spaces. Introducing it as an addon before firefox implement it officially.

Differences from Edge version
----

1. Because the firefox sidebar is too narrow for the feature, I put the set aside tabs in a separate tab.

2. It only set aside normal tabs that is not pinned, so if the firefox preferrence page is open, it is not set aside.

3. Bookmark function is not included. I don't think it is very useful. If you think so, let me know.

How to build the extension
----
- clone the repo to your local machine
- go to root directory of the repo and run
```
npm install
```
- build extension:
  - for dev build: run the follow command and it create extension files in `build` folder
  ```
  npm run build
  ```
  - for prod build: run the follow command and it create extension files in `release` folder
  ```
  npm run release
  ```
- to test the extension, follow [Temporary installation in Firefox](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)