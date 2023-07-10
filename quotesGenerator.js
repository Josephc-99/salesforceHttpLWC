import { LightningElement, track } from 'lwc';
import getQuotes from '@salesforce/apex/QuotesClass.getQuotes';

export default class QuotesGenerator extends LightningElement {
    @track categ;
    @track cnt;
    @track quotes;
    @track error;

 

    options = [
        { label: 'Amazing', value: 'Amazing' },
        { label: 'Attitude', value: 'Attitude' },
        { label: 'Anger', value: 'Anger' },
        { label: 'Cool', value: 'Cool'},
        { label: 'Courage', value: 'Courage' },
        { label: 'Dating', value: 'Dating'},
        {label: 'Failure', value: 'Failure'},
        {label: 'Fitness', value: 'Fitness'},
        {label: 'Learning', value: 'Learning'},
        {label: 'Money', value: 'Money'}

    ];

buttonHandler() {
    this.categ = this.template.querySelector('[data-id="category"]').value; 
    this.cnt = parseInt(this.template.querySelector('[data-id="count"]').value, 10); // Retrieve the count value from the input element
    this.getQuotesData();
}


    getQuotesData() {
        getQuotes({ category: this.categ, count: this.cnt })
            .then(result => {
                this.quotes = result;
                this.error = undefined;
                console.log('Quotes result:', this.quotes);
            })
            .catch(error => {
                this.error = error;
                this.quotes = undefined;
                console.error('Error fetching quotes:', error);
            });
    }

    
}
