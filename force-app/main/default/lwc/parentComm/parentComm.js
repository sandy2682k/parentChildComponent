import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ParentComm extends LightningElement {
    @track parentMessage = '';
    @track messageToChild = '';
    @track childMessage = '';
    @track responseTime = '';
    @track showChildResponse = false;

    // Update message when input changes
    handleInputChange(event) {
        this.parentMessage = event.target.value;
    }

    // Explicitly send message to child (only when button is clicked)
    sendToChild() {
        if (!this.parentMessage) {
            // Show error if no message to send
            this.showToast('Error', 'Please enter a message to send', 'error');
            return;
        }

        this.messageToChild = this.parentMessage;
        this.showToast('Success', 'Message sent to child component', 'success');
    }

    // Handle response from child component
    handleChildMessage(event) {
        // Get the message and format current time
        this.childMessage = event.detail.message;
        const now = new Date();
        this.responseTime = now.toLocaleTimeString();

        // Apply animation class to make response visible with animation
        this.showChildResponse = true;

        // Show toast notification
        this.showToast('New Message', 'Response received from child', 'info');
    }

    // Reset all messages
    resetMessages() {
        this.parentMessage = '';
        this.messageToChild = '';
        this.childMessage = '';
        this.showChildResponse = false;
    }

    // Helper method for toast notifications
    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }
}