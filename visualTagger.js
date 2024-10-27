const tagColors = {
    a:        { background: "blue", text: "white" },
    button:   { background: "dodgerblue", text: "white" },
    details:  { background: "peru", text: "black" },
    dialog:   { background: "steelblue", text: "white" },
    form:     { background: "lavender", text: "black" },
    input:    { background: "peachpuff", text: "black" },
    label:    { background: "palegreen", text: "black" },
    menu:     { background: "mediumturquoise", text: "black" },
    select:   { background: "darkslategray", text: "white" },
    textarea: { background: "plum", text: "black" },
    option:   { background: "mediumpurple", text: "white" },
    optgroup: { background: "darkkhaki", text: "black" },
    fieldset: { background: "cyan", text: "black" },
    legend:   { background: "powderblue", text: "black" },
    output:   { background: "moccasin", text: "black" },
    progress: { background: "plum", text: "black" },
    meter:    { background: "palegoldenrod", text: "black" },
    summary:  { background: "azure", text: "black" }
};

function createTagInfo(tagName, id, classList, colors) {
    const tagInfo = document.createElement('div');
    tagInfo.innerHTML = `${tagName}${id}${classList}`;
    Object.assign(tagInfo.style, {
        position: "absolute",
        top: "-20px",
        left: "0",
        color: colors.text,
        backgroundColor: colors.background,
        fontSize: "12px",
        padding: "5px",
        zIndex: "1000",
        border: "1px solid white"
    });
    return tagInfo;
}

function styleElement(element, colors) {
    Object.assign(element.style, {
        position: "relative",
        border: `2px solid ${colors.background}`,
        marginTop: "15px"
    });
}

function VisualTagger() {
    const relevantElements = Array.from(document.querySelectorAll(Object.keys(tagColors).join(',')));
    const fragment         = document.createDocumentFragment();
    
    let markedCount = 0;

    relevantElements.forEach(element => {
        const tagName = element.tagName.toLowerCase();
        const colors = tagColors[tagName];
        if (colors) {
            markedCount++;
            const id = element.id ? `#${element.id}` : '';
            const classList = Array.from(element.classList).map(cls => `.${cls}`).join('') || '';

            const tagInfo = createTagInfo(tagName, id, classList, colors);
            styleElement(element, colors);
            fragment.appendChild(tagInfo); 

            element.prepend(tagInfo);
        }
    });

    document.body.appendChild(fragment); 
}

VisualTagger();
