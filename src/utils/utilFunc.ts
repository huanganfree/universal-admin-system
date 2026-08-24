// 1. 定义菜单的 TypeScript 接口类型
export interface MenuNode {
    id: number;
    parentId: number | null;
    name: string;
    path: string;
    sort: number;
    children?: MenuNode[]; // 转树后自动生成该字段
    meta: { icon: string, [key: string]: any };
    [key: string]: any
}

/**
 * 将扁平数据高效转换为树形数据
 * @param flatList 后端返回的排序好的扁平数组
 */
export function flatToTree(flatList: MenuNode[]): MenuNode[] {
    const itemMap: Record<number, MenuNode> = {};
    const treeRoots: MenuNode[] = [];

    // 新增：先按 sort 升序排序，sort 为空的排到最后
    // 用 [...flatList] 拷贝一份，不修改原数组
    const sortedList = [...flatList].sort((a, b) => {
        const sortA = a.sort ?? Number.MAX_SAFE_INTEGER;
        const sortB = b.sort ?? Number.MAX_SAFE_INTEGER;
        return sortA - sortB;
    });

    // 第一步：深拷贝所有节点并存入 Map 方便通过 ID 瞬间查找到
    sortedList.forEach(item => {
        itemMap[item.id] = { ...item };
    });

    // 第二步：遍历数据，通过父级引用直接“各找各妈”
    sortedList.forEach(item => {
        const currentId = item.id;
        const parentId = item.parentId;
        const treeItem = itemMap[currentId];

        // 判断是否为顶级菜单（parentId 为 null 或者 0）
        if (parentId === null || parentId === 0) {
            treeRoots.push(treeItem as MenuNode);
        } else {
            // 找到对应的父级节点
            const parentNode = itemMap[parentId];
            if (parentNode) {
                if (!parentNode.children)
                    parentNode.children = []
                // 直接往父级的 children 数组里塞，利用了 JS 对象引用特性，全局会自动同步
                parentNode.children!.push(treeItem as MenuNode);
            } else {
                treeRoots.push(treeItem as MenuNode);
            }
        }
    });

    return treeRoots;
}