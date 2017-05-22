# cartManager, react redux responsive spa

    rev 0.1    05/22     : redux in
    rev 0.init 05/19/2017: initial cut


[DEMO](https://tetsuyac.github.io/cartManager)

## memo
1. **[responsivenes]** still rough in dynamic layout needing fine
   tuning. working on it.

1. **[pane drag resize and rearrangement]** *react-grid-layout*
   natively supports this feature yet disabled for now due to
   fine tuning still needs to go. working on it.

1. **[data externalization]** assets and products are asynchronously
   loaded up to serve app through fetch and import respectively.
   still in the middle of separating both files out from functional
   perspective yet it is fully implemented and functional.

## steps to run
1. git clone https://github.com/tetsuyac/cartManager.git d3Mol
1. cd cartManager
1. npm install
1. npm start
1. visit http://localhost:3010 with local browser
1. have a fun!

## references
#### create-react-app
https://github.com/facebookincubator/create-react-app/blob/master/README.md#getting-started
