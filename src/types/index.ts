/*!***********************************************!*\
****************************************************
|*|                    _oo0oo_                   |*|
|*|                   o8888888o                  |*|
|*|                   88" . "88                  |*|
|*|                   (| -_- |)                  |*|
|*|                   0\  =  /0                  |*|
|*|                 ___/`---'\___                |*|
|*|               .' \\|     |// '.              |*|
|*|              / \\|||  :  |||// \             |*|
|*|             / _||||| -:- |||||- \            |*|
|*|            |   | \\\  -  /// |   |           |*|
|*|            | \_|  ''\---/''  |_/ |           |*|
|*|            \  .-\__  '-'  ___/-. /           |*|
|*|          ___'. .'  /--.--\  `. .'___         |*|
|*|       ."" '<  `.___\_<|>_/___.' >' "".       |*|
|*|      | | :  `- \`.;`\ _ /`;.`/ - ` : | |     |*|
|*|      \  \ `_.   \_ __\ /__ _/   .-` /  /     |*|
|*|  =====`-.____`.___ \_____/___.-`___.-'=====  |*|
|*|                    `=---='                   |*|
|*|                                              |*|
****************************************************
\*!***********************************************!*/

type SidebarPosition = 'left'
    | 'right';
type ToogleButtonPosition = 'left'
    | 'right'
    | 'center';
type Backdrops = Element[];
type SidebarBoard = Element[];

type Options = {
    position: SidebarPosition,
    buttonPosition: ToogleButtonPosition
}

export class Sidebar {

    position: SidebarPosition;
    buttonPosition: ToogleButtonPosition;

    constructor(
        options: Options = {
            position: "left",
            buttonPosition: "right"
        }
    )
    {
        this.position       = options.position;
        this.buttonPosition = options.buttonPosition;
        this.start()
    }


    /**
     * Select All Buttons
     * @returns {Element}
     */
    buttons     = document.querySelectorAll('[data-sidebar-target]');


    /**
     * Select All Sidebar by Target Id
     * @param {String} id
     * @returns {Element}
     */
    sidebars = (id: string): NodeListOf<Element> => document.querySelectorAll(`[data-sidebar="${id}"]`);



    /**
     * Select All backdrop by Target Id
     * @param {String} id
     * @returns {Element}
     */
    backdrops = (id: string): Element[] => Array.from(document.querySelectorAll(`[data-sidebar-backdrop="${id}"]`));



    /**
     * Hidding sidebar element and backdrop element
     * @param {Element[]} sidebars
     * @param {Element[]} backdrops
     */
    hide = (
        sidebars: SidebarBoard,
        backdrops: Backdrops
    ) => {
        Array.from(sidebars).map(
            (sidebarElement) => {
                const sidebar = sidebarElement as HTMLElement;
                if (sidebar.classList.contains("flex"))
                {
                    sidebar.style.width = "0";
                    Array.from(backdrops).map( (backdrop) => (( backdrop as HTMLElement ).style.opacity = "0") );

                    setTimeout(
                        () => {
                            sidebar.style.opacity = "0";
                            Array.from(backdrops).map( (backdrop) => backdrop.classList.add("hidden") );
                            sidebar.classList.remove("flex");
                            sidebar.classList.add("hidden");
                        }, 200
                    );
                }
            }
        );
    };



    /**
     * Showing sidebar element and backdrop element
     * @param {SidebarBoard} sidebars
     * @param {Backdrops} backdrops
     */
    show = (
        sidebars: SidebarBoard,
        backdrops: Backdrops
    ) => {
        Array.from(sidebars).map(
            sidebarElement => {
                const sidebar =  sidebarElement as HTMLElement;
                if (sidebar.classList.contains('hidden')) {
                    sidebar.classList.add('flex')
                    sidebar.classList.remove('hidden')

                    Array.from(backdrops).map(backdrop => {
                        backdrop.classList.add('flex')
                        backdrop.classList.remove('hidden')
                    })

                    setTimeout(
                        () => {
                            Array.from(backdrops).map(backdrop => (( backdrop as HTMLElement ).style.opacity = "0") )
                            sidebar.style.opacity = "1";
                            sidebar.style.width = '18rem'
                        }, 200
                    );
                }
            }
        )
    }


    /**
     * Mapping toogle button target button [data-sidebar-target] value as Target Id
     * @param {string} target
     */
    toggle = (target: string = null) => {
        Array.from(this.buttons).map(
            (buttonElement) => {

                const button    = (buttonElement as HTMLElement)
                const targetId  = target || button.dataset.sidebarTarget;
                const positions = (
                    document.querySelector(`[data-sidebar="${targetId}"]`) as HTMLElement
                ).dataset.sidebarPosition || this.position;

                const sidebars  = Array.from(this.sidebars(targetId)) as SidebarBoard;
                const backdrops = this.backdrops(targetId);

                if (positions) {
                    sidebars.map(
                        (sidebarElement) => {
                            const sidebar   = (sidebarElement as HTMLElement)
                            const button    = sidebar.querySelector( "[data-button-position]") as HTMLElement;
                            const position  = sidebar.dataset.sidebarPosition || this.position;

                            if (button) {
                                const buttonPosition = button.dataset.buttonPosition || this.buttonPosition;
                                if (
                                    buttonPosition != "" ||
                                    buttonPosition != undefined ||
                                    buttonPosition != null
                                ) {
                                    switch (buttonPosition)
                                    {
                                        case "left":
                                            button.style.justifyContent = "flex-start";
                                        break;
                                        case "right":
                                            button.style.justifyContent = "flex-end";
                                        break;
                                        case "center":
                                            button.style.justifyContent = "center";
                                        break;
                                        default:
                                            button.style.justifyContent = "flex-end";
                                        break;
                                    }
                                }
                            }

                            // Fix: Assign to style property instead of style
                            Object.assign(sidebar.style, { [position]: "0" });
                        }
                    );
                }

                button.addEventListener("click",
                    (e) => {
                        e.preventDefault();
                        this.hide(sidebars, backdrops);
                        this.show(sidebars, backdrops);
                    }
                );
            }
        );
    }

    start = () =>
    {
        this.toggle()
    }
}

export namespace Sidebar {
    export type SidebarPosition = 'left' | 'right';
    export type ToogleButtonPosition = 'left' | 'right' | 'center';
    export type Backdrops = Element[];
    export type SidebarBoard = Element[];
    export type Options = {
        position: SidebarPosition,
        buttonPosition: ToogleButtonPosition
    }
}