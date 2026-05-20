const template = readline().split(/\-|\*\*/);
const i = parseInt(readline());
let lastPart = template[template.length - 1];
let str = template.slice(0, template.length - 1).join('-');

// Check if the last part is a valid number (only digits)
const isValidNumber = /^\d+$/.test(lastPart);

if (isValidNumber) {
    // Handle increment with leading zeros
    const originalLength = lastPart.length;
    let num = parseInt(lastPart, 10);
    num += i;
    
    // Preserve leading zeros if the original number had them
    let incremented = num.toString();
    if (originalLength > incremented.length) {
        incremented = incremented.padStart(originalLength, '0');
    }
    
    console.log(`${str}-${incremented}`);
} else {
    // Invalid increment - the last part is not a valid number
    // For cases like **magic**004, we need to extract the trailing number
    const match = lastPart.match(/^(.+?)(\d+)$/);
    
    if (match) {
        // Has text + number at the end (e.g., "**magic**004")
        const textPart = match[1];
        const numberPart = match[2];
        
        // Increment the number part
        const originalLength = numberPart.length;
        let num = parseInt(numberPart, 10);
        num += i;
        
        let incremented = num.toString();
        if (originalLength > incremented.length) {
            incremented = incremented.padStart(originalLength, '0');
        }
        
        console.log(`${str}-${textPart}${incremented}`);
    } else {
        // Completely invalid (no number at the end)
        console.log(`${str}-${lastPart}`);
    }
}