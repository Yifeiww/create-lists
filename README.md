# create-lists

## Installation

  Download the repo and in the extracted folder run:
  
  `npm install`

  Then to use the application, run:

 `npm start`
 
## Libraries used
 
  * [uuid](https://www.npmjs.com/package/uuid) - Used to provide a unique id for each list and each item
  * [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) - Provided drag and drop feature to make it able to change the order of items in each list and move an item from one list to another
  * [styled-components](https://github.com/styled-components/styled-components) - Make it possible to use components as a low-level styling construct
  
    *This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).*
    
## Scaling

  * For now I'm using an array of objects to store the lists and items, for the convenience of `.splice()` when deleting lists or items and changing orders. 
  When it comes to a thousand lists, each with a hundred items, we can use an object to store lists with their ids as keys, similarly when store items in a list. And then 
  use another object to record the order with the index as key and the id as the value. 
  * Also we can integrate libraries like [react-virtualized](https://github.com/bvaughn/react-virtualized) or other similar ones to efficiently render large lists, for it only renders the visible content.
