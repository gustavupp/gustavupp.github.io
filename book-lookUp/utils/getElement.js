function getDomElement(selection){
    const ELEMENT = document.querySelector(selection);
    if (ELEMENT){
        return ELEMENT;
    } else {
        throw new Error(`Check "${selection}". No such element exists`);
    }
}

export default getDomElement;