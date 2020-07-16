import { getCriminals } from './criminals/CriminalProvider.js';
import { CriminalList } from "./criminals/CriminalList.js";
import {getConvictions} from "./convictions/ConvictionProvider.js"
import {ConvictionSelect} from "./convictions/ConvictionSelect.js"
import{getOfficers} from "./officers/OfficerProvider.js"
import {OfficerSelect} from "./officers/OfficerSelect.js"
import { NoteForm } from "./notes/NoteForm.js";
import "./criminals/KnownAssociates.js"

getCriminals().then(() => {

    /*
        Now that you have the data, what
        component should be rendered?
    */
    CriminalList()
    NoteForm()

})

getConvictions().then(ConvictionSelect)
getOfficers().then(OfficerSelect)