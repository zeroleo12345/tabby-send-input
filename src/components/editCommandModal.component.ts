import { Component } from '@angular/core'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
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
        private modalInstance: NgbActiveModal,
    ) {
    }

    startCaptureShortcut(event: Event) {
        this.ngbModal.open(HotkeyInputModalComponent).result.then((value: string[]) => {
            this.command.shortcut = value[0]
            console.log(`inputKey: ${this.command.shortcut}`)
        })
    }

    save () {
        this.modalInstance.close(this.command)
    }

    cancel () {
        this.ngbModal.dismissAll()
    }
}
