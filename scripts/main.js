console.log("What up, Monday?!");

import { OfficerList } from "./officers/OfficerList.js";
import { arrestingOfficerSelect } from "./officers/OfficerSelect.js";
import { CriminalList } from "./criminals/CriminalList.js";
import { ConvictionSelect } from "./convictions/ConvictionSelect.js";
import { NoteForm } from "./notes/NoteForm.js";

OfficerList();
CriminalList();
ConvictionSelect();
arrestingOfficerSelect();
NoteForm();