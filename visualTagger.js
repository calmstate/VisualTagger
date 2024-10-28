(function() {
    const tagColors = {
        a: { background: "blue", text: "white" },
        button: { background: "dodgerblue", text: "white" },
        details: { background: "peru", text: "black" },
        dialog: { background: "steelblue", text: "white" },
        form: { background: "lavender", text: "black" },
        input: { background: "peachpuff", text: "black" },
        label: { background: "palegreen", text: "black" },
        menu: { background: "mediumturquoise", text: "black" },
        select: { background: "darkslategray", text: "white" },
        textarea: { background: "plum", text: "black" },
        option: { background: "mediumpurple", text: "white" },
        optgroup: { background: "darkkhaki", text: "black" },
        fieldset: { background: "cyan", text: "black" },
        legend: { background: "powderblue", text: "black" },
        output: { background: "moccasin", text: "black" },
        progress: { background: "plum", text: "black" },
        meter: { background: "palegoldenrod", text: "black" },
        summary: { background: "azure", text: "black" }
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
        tagInfo.classList.add('visual-tagger-info');
        return tagInfo;
    }

    function styleElement(element, colors) {
        element.dataset.originalBorder = element.style.border;
        element.dataset.originalMarginTop = element.style.marginTop;
        Object.assign(element.style, {
            position: "relative",
            border: `2px solid ${colors.background}`,
            marginTop: "15px"
        });
    }
    
    function restoreElementStyle(element) {
        element.style.border = element.dataset.originalBorder || "";
        element.style.marginTop = element.dataset.originalMarginTop || "";
        delete element.dataset.originalBorder;
        delete element.dataset.originalMarginTop;
    }
    
    function VisualTagger() {
        const relevantElements = Array.from(document.querySelectorAll(Object.keys(tagColors).join(',')));

        if (document.querySelector('.visual-tagger-info')) {
            const taggedElements = document.querySelectorAll('.visual-tagger-info');
                  taggedElements.forEach(e=>e.remove());
                  relevantElements.forEach(element => restoreElementStyle(element));
        } else {
            relevantElements.forEach(element => {
                const tagName = element.tagName.toLowerCase();
                const colors = tagColors[tagName];
                if (colors) {
                    const id = element.id ? `#${element.id}` : '';
                    const classList = Array.from(element.classList).map(cls => `.${cls}`).join('') || '';

                    const tagInfo = createTagInfo(tagName, id, classList, colors);
                    styleElement(element, colors);
                 
                        const rect = element.getBoundingClientRect();
                        tagInfo.style.top = `${rect.top - 30}px`; 
                        tagInfo.style.left = `${rect.left}px`;
                        document.body.appendChild(tagInfo);
                   
                }
            });
        }
    }

    VisualTagger();
})();
