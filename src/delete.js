export function garbagePrep(element) {
  if (element.nodeType !== Node.ELEMENT_NODE) {
      console.error('Not a valid element node');
      return;
  }

  // Remove all event listeners from the element (must know listener types)
//   const eventTypes = ['click', 'mouseover', 'keydown']; // Add all types of listeners your app uses
//   eventTypes.forEach(type => {
//       element.removeEventListener(type, () => {}); // Replace with the actual handler reference
//   });

    

  // Recursively call the function for all children
  Array.from(element.children).forEach(child => {
      garbagePrep(child);
  });

    let clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
  // Remove the element from the DOM if necessary
  if (element.parentNode) {
      element.parentNode.removeChild(element);
  } else {
      console.log("No parent");
  }

  // Nullify the element reference
  element = null;
  clonedElement = null;
}