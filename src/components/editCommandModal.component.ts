import { Component } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { QuickCmds } from '../api'
import {HotkeyInputModalComponent} from "./hotkeyInputModal.component";

@Component({
    template: require('./editCommandModal.component.pug'),
})
export class EditCommandModalComponent {
    allGroups: string[] = []
    command: QuickCmds

    constructor (
        private ngbModal: NgbModal,
    ) {
    }

    startCaptureShortcut(event: Event) {
        this.ngbModal.open(HotkeyInputModalComponent).result.then((hotkey: string[]) => {
            this.command.shortcut = hotkey[0]
            console.log(`inputKey: ${this.command.shortcut}`)
        })
    }

    save () {
    }

    cancel () {
        this.ngbModal.dismissAll()
    }
}
