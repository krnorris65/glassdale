import { getCriminals } from './criminals/CriminalProvider.js';
import { CriminalList } from "./criminals/CriminalList.js";

getCriminals().then(() => {

    /*
        Now that you have the data, what
        component should be rendered?
    */
    CriminalList()
})