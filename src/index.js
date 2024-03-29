import ClipboardJS from "clipboard";
import { Sidebar } from "@sophat/sidebar";

/**
 * If position: 'left' Sidebar show up left position {buttonPosition} should be 'right' (optional),
 * If position: 'right' Sidebar show up right position {buttonPosition} should be 'left' (optional)
 *
 * @param position: 'left' | 'right'
 * @param buttonPosition: 'left' | 'right' | 'center'
 *
 * @default
 * new Sidebar({
 *     position: 'left',
 *     buttonPosition: 'right'
 * });
*/
new Sidebar();

const button        = document.querySelector('[aria-label="Copy"]')
var clipboard       = new ClipboardJS(button);
const checkedIcon   = () => {
    return(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-green-700">
            <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
        </svg>`
    )
}

clipboard.on('success', function (e) {
    const oldText       = button.innerHTML;
    button.innerHTML    = checkedIcon();
    button.setAttribute('disabled', 'disabled');
    setTimeout(() => {
        button.innerHTML = oldText;
        button.removeAttribute('disabled');
    }, 3000);
});