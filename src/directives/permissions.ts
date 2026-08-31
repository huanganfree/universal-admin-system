import type { Directive } from 'vue'

export type PermissionsDirective = Directive<HTMLElement, string>

declare module 'vue' {
    export interface GlobalDirectives {
        vHighlight: PermissionsDirective
    }
}

export const permissionsDirective = {
    mounted: (el, binding) => {
        const value = binding.value;
        const permissionBtns = JSON.parse(localStorage.getItem('permissionBtns') || '[]').map((item: any) => item.permission);
        if (permissionBtns.includes(value) && value) {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    }
} satisfies PermissionsDirective