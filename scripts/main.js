import { CriminalList } from "./criminals/CriminalList.js";
import { ConvictionSelect } from "./convictions/ConvictionSelect.js"
import { OfficerSelect } from "./officers/OfficerSelect.js"
import { NoteForm } from "./notes/NoteForm.js";
import "./criminals/KnownAssociates.js"
import { WitnessStatementButton } from "./witnesses/WitnessStatementButton.js";
import "./witnesses/WitnessList.js"
import { NoteButton } from "./notes/NoteButton.js";
import "./notes/NoteList.js"
import { DisplayFacilitiesButton } from "./facility/FacilityButton.js";
import "./facility/FacilityList.js"


CriminalList()
NoteForm()

ConvictionSelect()
OfficerSelect()
WitnessStatementButton()
NoteButton()
DisplayFacilitiesButton()