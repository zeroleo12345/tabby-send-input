import { Component, HostListener } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { QuickCmds } from '../api'
import { altKeyName, metaKeyName, getKeyName } from "../service"

@Component({
    template: require('./editCommandModal.component.pug'),
})
export class EditCommandModalComponent {
    allGroups: string[] = []
    command: QuickCmds
    isCapturingShortcut: boolean = false

    constructor (
        private modalInstance: NgbActiveModal,
    ) {
    }

    @HostListener('document:keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (this.isCapturingShortcut) {
            event.preventDefault()
            event.stopPropagation()

            const eventData = {
                ctrlKey: event.ctrlKey,
                metaKey: event.metaKey,
                altKey: event.altKey,
                shiftKey: event.shiftKey,
                code: event.code,
                key: event.key,
                eventName: "keydown",
                time: event.timeStamp,
                registrationTime: performance.now(),
            }
            const keyName = getKeyName(eventData)

            // Handle ESC key to cancel capture without changes
            if (keyName === 'Escape') {
                this.isCapturingShortcut = false
                return
            }

            // Handle Delete or Backspace to clear the shortcut
            if (keyName === 'Delete' || keyName === 'Backspace') {
                this.command.shortcut = ''
                this.isCapturingShortcut = false
                return
            }

            let shortcut = ''
            const modifiers: string[] = []

            if (eventData.ctrlKey || eventData.metaKey) {
                modifiers.push('Ctrl')
            }
            if (eventData.altKey) {
                modifiers.push(altKeyName)
            }
            if (eventData.shiftKey) {
                modifiers.push('Shift')
            }

            // Sort modifiers to ensure consistent ordering
            modifiers.sort()

            // Add modifiers to shortcut string
            if (modifiers.length > 0) {
                shortcut = modifiers.join('+') + '+'
            }

            // Only process if we have a valid main key (not just modifiers)
            console.log("222 eventData.ctrlKey", eventData.ctrlKey)
            console.log("222 eventData.metaKey", eventData.metaKey)
            console.log("222 eventData.shiftKey", eventData.shiftKey)
            console.log("222 eventData.altKey", eventData.altKey)
            console.log("222 eventData.key", eventData.key)
            console.log("222 keyName", keyName)
            console.log("222 altKeyName", altKeyName)
            if (!['Control', altKeyName, 'Shift', metaKeyName].includes(keyName)) {
                let processedKey = keyName

                // Handle special cases for keys that need consistent naming
                if (keyName.length === 1) {
                    // For single character keys, use uppercase
                    processedKey = keyName.toUpperCase()
                } else {
                    // For special keys (like ArrowUp), use camelCase with first letter uppercase
                    processedKey = keyName.charAt(0).toUpperCase() + keyName.slice(1)
                }

                shortcut += processedKey
                /*
                UI输入框监听设置快捷键
                 */
                this.command.shortcut = shortcut
                this.isCapturingShortcut = false
            }
        }
    }

    startCaptureShortcut(event: Event) {
        event.preventDefault()
        this.isCapturingShortcut = true
    }

    save () {
        this.modalInstance.close(this.command)
    }

    cancel () {
        this.modalInstance.dismiss()
    }
}
