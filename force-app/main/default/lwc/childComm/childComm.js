import { LightningElement, api, track } from 'lwc';

export default class ChildComm extends LightningElement {
    // Public property to receive message from parent
    @api parentMessage;

    // Track custom response state
    @track customResponse = '';
    @track showModal = false;

    // Simple acknowledgment response
    sendAcknowledgment() {
        // Construct the response message
        const responseMessage = `✓ Message "${this.parentMessage}" received and acknowledged!`;
        // Dispatch the event with the response message
        this.dispatchResponseEvent(responseMessage);
    }
    // Show custom response modal
    showCustomResponseModal() {
        this.showModal = true;
    }
    // Close modal
    closeModal() {
        this.showModal = false;
    }
    // Handle custom response change
    handleResponseChange(event) {
        this.customResponse = event.target.value;
    }
    // Send custom response
    sendCustomResponse() {
        if (!this.customResponse) {
            console.warn('Custom response is empty. Aborting send.');
            return; // Don't send empty responses
        }
        const responseMessage = `${this.customResponse}`;
        this.dispatchResponseEvent(responseMessage);
        this.closeModal();
        this.customResponse = ''; // Reset for next time
    }
    // Helper method to dispatch event
    dispatchResponseEvent(message) {
        const childMessageEvent = new CustomEvent('childmessage', {
            detail: { message: message },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(childMessageEvent);
    }
}