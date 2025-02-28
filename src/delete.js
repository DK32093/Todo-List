// Function to recursively remove event listeners and set elements to null
export function garbagePrep(element) {
    if (element.nodeType !== Node.ELEMENT_NODE) {
        console.error('Not a valid element node');
        return;
      }
    // Shallow clone the element to remove event listeners
    let newElement = element.cloneNode(false);
    
    // Loop through all children of the element and recursively call the function
    Array.from(element.children).forEach(child => {
      garbagePrep(child);
    });
  
    // Replace the element with its clone to remove event listeners
    if (element.parentNode) {
        console.log(element + "= element")
        console.log(element.parentNode + " = parent node")
      element.parentNode.replaceChild(newElement, element);
    } else {
        console.log("No parent")
    }
    
    // Set the cloned element to null to prepare for garbage collection
    newElement = null;
    element = null;
  }