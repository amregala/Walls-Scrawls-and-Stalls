# Walls Scrawls and Stalls

### Project Description

The evolving nature of street art and murals that adorn Comuna 13 in Medellin, Colombia inspired the creation of this app -which in essence aims to create a repository for graffiti images from around the world. Graffiti is transient in nature and as such often times goes undocumented or recorded. This app would help document some of those ephemeral visuals by allowing users to upload and post images of graffiti/tags they encounter from around the world to this shared site.

According to an article from the ([Atlantic](https://www.theatlantic.com/health/archive/2014/11/behind-the-writing-on-the-stalls/383016/)), graffiti is often broken down into "three categories: Tourist graffiti (“John wuz here”), inner-city graffiti (like tagging and street art), and toilet graffiti (or “latrinalia” as it’s sometimes called in academic literature)" - that categorical breakdown is the reasoning behind the name of this app which is - Walls, Scrawls, and Stalls.  
<br />
### Deployed Site:  [Walls, Scrawls and Stalls](https://walls-scrawls-and-stalls.herokuapp.com/wss-home)

## Application Information
#### Dependencies/Packages Used: 
- express
- ejs
- dotenv
- mongoose 
- method-override 
- express-session
- bycrypt 

#### Routes: 
| URL    | HTTP VERB | ACTION
| ----------- | ----------- |-----------
| /wss-home      | GET       | HOME SHOW PAGE
| /walls      | GET       | INDEX
| /walls/new   | GET        | NEW
| /walls      | POST       | CREATE
| /walls/:id      | GET       | SHOW
| /walls/:id/edit      | GET       | EDIT
| /walls/:id      | PUT       | UPDATE
| /walls/:id      | DELETE       | DESTROY



## Wireframes

Home Page
![wf- landing page](https://media.git.generalassemb.ly/user/43399/files/eff6d265-aad2-4c23-a8db-cfd3e2f5be6a)

Wall Layout
![wall-v2](https://media.git.generalassemb.ly/user/43399/files/151c0775-2643-4237-b3c7-5dc804d1705c)

## User Stories
 As a user, I want to be able to add images of graffiti I have come across and taken a photo of to this site.  I would like to be able to add quick text details like location, year photo was taken and artists name/tag - if known.  I would like for this image to then be visible to all who access the site but want the user to be the only one who has the ability to make changes to post. 

