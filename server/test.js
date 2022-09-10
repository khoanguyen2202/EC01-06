

import {fx} from "money"
require(["money"], function(fx) { /* ... */ });

console.log(fx.convert(300000, { from: "VND", to: "USD" }));