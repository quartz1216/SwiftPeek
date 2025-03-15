document.addEventListener("click", function(event) {
    if (event.shiftKey && event.button === 0) {
        event.preventDefault(); 
        
        let link = event.target.closest("a");
        if (link && link.href) {
            showPreview(link.href, event);
        }
    }
}, true);

function showPreview(url, event) {
    let existingPreview = document.getElementById("link-preview-container");
    if (existingPreview) {
        existingPreview.remove();
    }
    
    let overlay = document.createElement("div");
    overlay.id = "link-preview-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0, 0, 0, 0.5)";
    overlay.style.zIndex = "9999";
    document.body.appendChild(overlay);
    
    let previewContainer = document.createElement("div");
    previewContainer.id = "link-preview-container";
    previewContainer.style.position = "fixed";
    previewContainer.style.left = "20%";
    previewContainer.style.top = "8px";
    previewContainer.style.width = "60%";
    previewContainer.style.height = "calc(100% - 16px)";
    previewContainer.style.background = "white";
    previewContainer.style.borderRadius = "8px";
    previewContainer.style.zIndex = "10000";
    previewContainer.style.display = "flex";
    previewContainer.style.flexDirection = "column";
    previewContainer.style.opacity = "0";
    previewContainer.style.transform = "scale(0.9)";
    previewContainer.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    
    let buttonContainer = document.createElement("div");
    buttonContainer.style.position = "fixed";
    buttonContainer.style.top = "12px";
    buttonContainer.style.right = "12px";
    buttonContainer.style.display = "flex";
    buttonContainer.style.gap = "10px";
    buttonContainer.style.zIndex = "10001";
    
    function createIconButton(svgPath, onClick) {
        let button = document.createElement("button");
        button.style.width = "40px";
        button.style.height = "40px";
        button.style.border = "none";
        button.style.borderRadius = "50%";
        button.style.background = "#007BFF"; 
        button.style.display = "flex";
        button.style.justifyContent = "center";
        button.style.alignItems = "center";
        button.style.cursor = "pointer";
        button.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
        
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "20");
        svg.setAttribute("height", "20");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "white");
        svg.setAttribute("stroke-width", "2");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-linejoin", "round");
        
        let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", svgPath);
        svg.appendChild(path);
        button.appendChild(svg);
        
        button.addEventListener("click", onClick);
        return button;
    }
    
    let openTabButton = createIconButton("M13 3h8v8m-8 0L21 3 3 21", function() {
        window.open(url, "_blank");
        previewContainer.remove();
        overlay.remove();
        buttonContainer.remove();
    });
    
    let closeButton = createIconButton("M6 18L18 6M6 6l12 12", function() {
        previewContainer.style.opacity = "0";
        previewContainer.style.transform = "scale(0.9)";
        setTimeout(() => {
            previewContainer.remove();
            overlay.remove();
            buttonContainer.remove();
        }, 300);
    });
    
    buttonContainer.appendChild(openTabButton);
    buttonContainer.appendChild(closeButton);
    document.body.appendChild(buttonContainer);
    
    let preview = document.createElement("iframe");
    preview.id = "link-preview";
    preview.src = url;
    preview.style.flex = "1";
    preview.style.width = "100%";
    preview.style.height = "100%";
    preview.style.border = "none";
    preview.style.borderRadius = "8px";
    
    previewContainer.appendChild(preview);
    document.body.appendChild(previewContainer);
    
    overlay.addEventListener("click", function() {
        previewContainer.style.opacity = "0";
        previewContainer.style.transform = "scale(0.9)";
        setTimeout(() => {
            previewContainer.remove();
            overlay.remove();
            buttonContainer.remove();
        }, 300);
    });

    setTimeout(() => {
        previewContainer.style.opacity = "1";
        previewContainer.style.transform = "scale(1)";
    }, 10);
}