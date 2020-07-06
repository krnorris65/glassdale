import { getCriminals } from './criminals/CriminalProvider.js';
import { CriminalList } from "./criminals/CriminalList.js";
import {getConvictions} from "./convictions/ConvictionProvider.js"
import {ConvictionSelect} from "./convictions/ConvictionSelect.js"

getCriminals().then(() => {

    /*
        Now that you have the data, what
        component should be rendered?
    */
    CriminalList()
})

getConvictions().then(ConvictionSelect)