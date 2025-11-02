// 默认奖品配置（常量）
const DEFAULT_PRIZES = [
    { name: '迪士尼或长隆或环球影城游乐园1次', probability: 0.1, restriction: { enabled: true, type: 'year', maxCount: 1 } },
    { name: '和妈妈商量养一种自己喜欢的植物，自己负责照顾', probability: 0.9, restriction: { enabled: true, type: 'month', maxCount: 1 } },
    { name: '奖励全家去香港科学馆一次', probability: 4, restriction: { enabled: false, type: null, maxCount: 1 } },
    { name: '奖励宝宝自己决定周末中的一天全家出行的目的地，天气允许内，时间需要和爸爸妈妈商量，距离 1 个半小时内', probability: 5, restriction: { enabled: false, type: null, maxCount: 1 } },
    { name: '奖励一顿 pizza 披萨', probability: 5, restriction: { enabled: false, type: null, maxCount: 1 } },
    { name: '奖励一顿麦当劳', probability: 5, restriction: { enabled: false, type: null, maxCount: 1 } },
    { name: '奖励帮妈妈/爸爸做一次家务（妈妈或爸爸制定任务），并获得 5 元零钱奖励', probability: 15, restriction: { enabled: false, type: null, maxCount: 1 } },
    { name: '买一种健康零食20元以内', probability: 5, restriction: { enabled: false, type: null, maxCount: 1 } },
    { name: '买一个玩具 20 元以内，', probability: 5, restriction: { enabled: false, type: null, maxCount: 1 } },
    { name: '奖励 1 次额外看 20 分钟平板的机会', probability: 5, restriction: { enabled: false, type: null, maxCount: 1 } },
    { name: '奖励 1 次和爸爸妈妈一起看纪录片的机会', probability: 10, restriction: { enabled: false, type: null, maxCount: 1 } },
    { name: '奖励 1 次大富翁/其他桌游机会，游戏时间半小时内', probability: 10, restriction: { enabled: false, type: null, maxCount: 1 }},
    { name: '奖励选 1 本自己喜欢的图书馆没有的英文书，50 元以内', probability: 5, restriction: { enabled: false, type: null, maxCount: 1 } },
    { name: '奖励选 1 本自己喜欢的图书馆没有的中文书，50 元以内', probability: 5, restriction: { enabled: false, type: null, maxCount: 1 } },
    { name: '奖励 1 次和爸爸妈妈一起看电影的机会', probability: 10, restriction: { enabled: false, type: null, maxCount: 1 } },
    { name: '奖励 1 次周末外出时自己决定出行的衣服搭配的机会', probability: 10, restriction: { enabled: false, type: null, maxCount: 1 } },
];

// 当前奖品配置（从本地存储加载或使用默认值）
let prizes = JSON.parse(JSON.stringify(DEFAULT_PRIZES));

// 默认任务模板（常量）
const DEFAULT_TASKS_TEMPLATE = [
    { name: '放学回家自己主动完成学校作业', points: 1 },
    { name: '放学回家自己主动完成妈妈留的英文数学2页题（正反面算一页）', points: 1 },
    { name: '放学回家自己主动完成妈妈留的英文2页（或10个单词）书写/默写', points: 1 },
    { name: '自己主动阅读 30 分钟书籍', points: 1 },
    { name: '自己主动帮助爸爸妈妈做家务', points: 1 },
    { name: '每天户外运动 30 分钟', points: 1 },
    { name: '画一幅画/完成艺术创作', points: 1 },
    { name: '每天早晨自己起床、刷牙、洗脸、完成个人卫生', points: 1 },
    { name: '每天收拾好书包，检查书籍和需要携带的物品', points: 1 },
    { name: '每天遇到保安叔叔/阿姨/认识的朋友 可以很有礼貌的看着对方的眼睛打招呼，也可以主动和爸爸妈妈介绍新认识的朋友', points: 1 },
    { name: '放学回家可以给爸爸或妈妈讲述今天上课的内容，学到了哪些新的知识，发生了哪些有意思的事情', points: 1 },
    { name: '放学回家自己主动完成妈妈留的中文2页（或10个字）书写/默写', points: 1 },
    { name: '放学回家自己主动背 10 个新的英文单词', points: 1 },
    { name: '放学回家自己主动背 5 个中文成语', points: 1 },
    { name: '放学回家自己主动背 1 个古诗', points: 1 },
    { name: '自己主动了解 1 个历史故事，并给爸爸或妈妈讲解', points: 1 },
    { name: '自己主动上英文课，提前做预习并进行复习，给爸爸妈妈讲解今天学习的内容', points: 1 },
    { name: '自己的玩具或者书用完可以归还到原来的位置', points: 1 },
];

// 获取默认任务列表（每次调用生成新的ID）
function getDefaultTasks() {
    const baseId = Date.now();
    return DEFAULT_TASKS_TEMPLATE.map((task, index) => ({
        id: baseId + index,
        name: task.name,
        points: task.points,
        completedToday: false
    }));
}

// 用户管理系统
let users = []; // 用户列表
let currentUserId = null; // 当前用户ID

// 任务和积分系统（当前用户的数据，会从用户对象中加载）
let tasks = []; // 任务列表
let currentPoints = 0; // 当前积分
let spinCost = 100; // 抽奖消耗积分
let completionHistory = {}; // 完成记录 {日期: [任务ID列表]}
let lastCompletionDate = null; // 最后完成日期
let streakDays = 0; // 连续完成天数

// 统计数据
let totalTasksCompleted = 0; // 累计完成任务数
let totalPointsEarned = 0; // 累计获得积分
let maxStreakDays = 0; // 最高连续天数
let unlockedAchievements = []; // 已解锁的成就
let totalSpins = 0; // 累计抽奖次数
let allTasksCompletedDays = 0; // 单日完成所有任务的天数
let weeklyPerfectDays = 0; // 一周内完成所有任务的天数（用于周成就）
let prizeHistory = []; // 抽奖历史 [{ prizeName: string, date: string, cost: number, timestamp: number }]

let isSpinning = false;
let canvas, ctx;
let currentCalendarMonth = new Date().getMonth();
let currentCalendarYear = new Date().getFullYear();
let viewingDate = null; // 当前查看的日期（null表示查看今天）

// 颜色配置（用于转盘绘制）
const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
    '#F8B739', '#52BE80', '#EC7063', '#5DADE2'
];

// 初始化
window.addEventListener('DOMContentLoaded', () => {
    console.log('[系统初始化] 开始初始化应用');
    canvas = document.getElementById('wheelCanvas');
    ctx = canvas.getContext('2d');
    console.log('[系统初始化] Canvas 初始化完成');
    
    // 从本地存储加载数据
    loadData();
    console.log('[系统初始化] 数据加载完成, 当前积分:', currentPoints, ', 消耗积分:', spinCost);
    
    // 响应式调整画布大小
    adjustCanvasSize();
    window.addEventListener('resize', adjustCanvasSize);
    
    initEventListeners();
    console.log('[系统初始化] 事件监听器已绑定');
    
    renderPrizes();
    renderTasks();
    updatePointsDisplay();
    updateStreakDisplay();
    updateTodayProgress();
    renderAchievements();
    drawWheel();
    
    console.log('[系统初始化] 界面渲染完成');
    
    // 渲染用户列表（如果需要）
    renderUserList();
    updateCurrentUserDisplay();
    
    // 渲染日历
    renderCalendar();
    
    // 初始化查看日期为今天
    viewingDate = null;
    updateViewingDateIndicator();
    
    // 根据用户选择状态更新UI
    updateUIForUserSelection();
    
    // 检查是否是新的一天，重置任务完成状态
    checkNewDay();
    
    // 检查积分里程碑
    checkMilestones();
    
    console.log('[系统初始化] 初始化完成');
});

// 调整画布大小（响应式）
function adjustCanvasSize() {
    const container = canvas.parentElement;
    // 增加转盘的最大尺寸，根据容器宽度动态调整，最大可达700px
    const maxSize = Math.min(700, container.offsetWidth - 80);
    canvas.width = maxSize;
    canvas.height = maxSize;
    drawWheel();
}

// 初始化事件监听
function initEventListeners() {
    document.getElementById('spinBtn').addEventListener('click', spinWheel);
    document.getElementById('addPrizeBtn').addEventListener('click', addPrize);
    document.getElementById('resetBtn').addEventListener('click', resetPrizes);
    document.getElementById('addTaskBtn').addEventListener('click', addTask);
    document.getElementById('costConfigBtn').addEventListener('click', showCostModal);
    document.getElementById('confirmCostBtn').addEventListener('click', confirmCostChange);
    document.getElementById('cancelCostBtn').addEventListener('click', hideCostModal);
    document.getElementById('costModal').addEventListener('click', (e) => {
        if (e.target.id === 'costModal') {
            hideCostModal();
        }
    });
    
    // 支持回车键确认
    document.getElementById('costInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            confirmCostChange();
        }
    });
    document.getElementById('showStatsBtn').addEventListener('click', showStatsModal);
    document.getElementById('closeStatsBtn').addEventListener('click', hideStatsModal);
    document.getElementById('statsModal').addEventListener('click', (e) => {
        if (e.target.id === 'statsModal') {
            hideStatsModal();
        }
    });
    document.getElementById('clearDataBtn').addEventListener('click', showClearDataModal);
    document.getElementById('userManageBtn').addEventListener('click', showUserManageModal);
    document.getElementById('closeUserManageBtn').addEventListener('click', hideUserManageModal);
    document.getElementById('addUserBtn').addEventListener('click', addNewUser);
    document.getElementById('userManageModal').addEventListener('click', (e) => {
        if (e.target.id === 'userManageModal') {
            hideUserManageModal();
        }
    });
    document.getElementById('confirmEditBtn').addEventListener('click', confirmEditUser);
    document.getElementById('cancelEditBtn').addEventListener('click', hideEditUserModal);
    document.getElementById('editUserModal').addEventListener('click', (e) => {
        if (e.target.id === 'editUserModal') {
            hideEditUserModal();
        }
    });
    // 支持回车键确认编辑
    document.getElementById('editUserName').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            confirmEditUser();
        }
    });
    document.getElementById('confirmClearBtn').addEventListener('click', confirmClearData);
    document.getElementById('cancelClearBtn').addEventListener('click', hideClearDataModal);
    const backToTodayBtn = document.getElementById('backToTodayBtn');
    if (backToTodayBtn) {
        backToTodayBtn.addEventListener('click', backToToday);
    }
    document.getElementById('prevMonthBtn').addEventListener('click', () => {
        if (!hasSelectedUser()) {
            showNoUserWarning();
            return;
        }
        currentCalendarMonth--;
        if (currentCalendarMonth < 0) {
            currentCalendarMonth = 11;
            currentCalendarYear--;
        }
        renderCalendar();
    });
    document.getElementById('nextMonthBtn').addEventListener('click', () => {
        if (!hasSelectedUser()) {
            showNoUserWarning();
            return;
        }
        currentCalendarMonth++;
        if (currentCalendarMonth > 11) {
            currentCalendarMonth = 0;
            currentCalendarYear++;
        }
        renderCalendar();
    });
    document.getElementById('clearDataModal').addEventListener('click', (e) => {
        if (e.target.id === 'clearDataModal') {
            hideClearDataModal();
        }
    });
}

// 渲染奖品列表
function renderPrizes() {
    const prizeList = document.getElementById('prizeList');
    prizeList.innerHTML = '';
    
    prizes.forEach((prize, index) => {
        // 确保限制配置存在
        if (!prize.restriction) {
            prize.restriction = { enabled: false, type: null, maxCount: 1 };
        }
        
        const restriction = prize.restriction;
        const restrictionTypeOptions = [
            { value: '', label: '无限制' },
            { value: 'day', label: '每天' },
            { value: 'month', label: '每月' },
            { value: 'year', label: '每年' }
        ];
        
        const prizeItem = document.createElement('div');
        prizeItem.className = 'prize-item';
        prizeItem.innerHTML = `
            <input type="text" class="prize-name" value="${prize.name}" 
                   data-index="${index}" placeholder="奖品名称">
            <input type="number" class="probability-input" value="${prize.probability % 1 === 0 ? prize.probability : prize.probability.toFixed(2)}" 
                   min="0" max="100" step="0.01" data-index="${index}" placeholder="概率%">
            <div class="restriction-config" data-index="${index}">
                <label>
                    <input type="checkbox" class="restriction-enabled" ${restriction.enabled ? 'checked' : ''} data-index="${index}">
                    限制
                </label>
                <select class="restriction-type" data-index="${index}" ${!restriction.enabled ? 'disabled' : ''}>
                    ${restrictionTypeOptions.map(opt => 
                        `<option value="${opt.value}" ${restriction.type === opt.value ? 'selected' : ''}>${opt.label}</option>`
                    ).join('')}
                </select>
                <input type="number" class="restriction-count" value="${restriction.maxCount}" 
                       min="1" step="1" data-index="${index}" placeholder="次数" 
                       ${!restriction.enabled ? 'disabled' : ''} style="width: 60px;">
            </div>
            <button class="delete-btn" data-index="${index}" ${prizes.length <= 2 ? 'disabled' : ''}>×</button>
        `;
        
        prizeList.appendChild(prizeItem);
    });
    
    // 绑定事件
    document.querySelectorAll('.prize-name').forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.dataset.index);
            prizes[index].name = e.target.value;
            saveData();
            drawWheel();
        });
    });
    
    document.querySelectorAll('.probability-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.dataset.index);
            const inputValue = e.target.value;
            
            // 允许输入小数，包括输入过程中的中间状态（如 "12."）
            if (inputValue === '' || inputValue === '.' || inputValue === '-') {
                // 允许中间输入状态
                return;
            }
            
            const value = parseFloat(inputValue);
            if (!isNaN(value)) {
                // 限制范围并保存，但保持原始输入显示
                prizes[index].probability = Math.max(0, Math.min(100, value));
                updateTotalProbability();
                saveData();
                drawWheel();
            }
        });
        
        // 失焦时格式化显示（保留2位小数）并验证
        input.addEventListener('blur', (e) => {
            const index = parseInt(e.target.dataset.index);
            const inputValue = e.target.value.trim();
            
            if (inputValue === '' || isNaN(parseFloat(inputValue))) {
                // 如果输入无效，恢复为当前保存的值
                const currentValue = prizes[index].probability;
                e.target.value = currentValue % 1 === 0 ? currentValue.toString() : currentValue.toFixed(2);
                return;
            }
            
            const value = parseFloat(inputValue);
            prizes[index].probability = Math.max(0, Math.min(100, value));
            
            // 格式化显示
            if (prizes[index].probability % 1 === 0) {
                e.target.value = prizes[index].probability.toString();
            } else {
                e.target.value = prizes[index].probability.toFixed(2);
            }
            
            updateTotalProbability();
            saveData();
            drawWheel();
        });
    });
    
    // 绑定限制配置事件
    document.querySelectorAll('.restriction-enabled').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const index = parseInt(e.target.dataset.index);
            const prize = prizes[index];
            if (!prize.restriction) {
                prize.restriction = { enabled: false, type: null, maxCount: 1 };
            }
            prize.restriction.enabled = e.target.checked;
            
            // 启用/禁用限制类型和次数输入
            const restrictionConfig = e.target.closest('.restriction-config');
            const typeSelect = restrictionConfig.querySelector('.restriction-type');
            const countInput = restrictionConfig.querySelector('.restriction-count');
            typeSelect.disabled = !e.target.checked;
            countInput.disabled = !e.target.checked;
            
            // 如果禁用限制，清空类型
            if (!e.target.checked) {
                prize.restriction.type = null;
            } else if (!prize.restriction.type) {
                // 如果启用但没有类型，默认设置为月
                prize.restriction.type = 'month';
                typeSelect.value = 'month';
            }
            
            saveData();
            console.log('[奖品限制] 更新限制配置:', prize.name, prize.restriction);
        });
    });
    
    document.querySelectorAll('.restriction-type').forEach(select => {
        select.addEventListener('change', (e) => {
            const index = parseInt(e.target.dataset.index);
            const prize = prizes[index];
            if (!prize.restriction) {
                prize.restriction = { enabled: false, type: null, maxCount: 1 };
            }
            prize.restriction.type = e.target.value || null;
            saveData();
            console.log('[奖品限制] 更新限制类型:', prize.name, prize.restriction.type);
        });
    });
    
    document.querySelectorAll('.restriction-count').forEach(input => {
        input.addEventListener('change', (e) => {
            const index = parseInt(e.target.dataset.index);
            const prize = prizes[index];
            if (!prize.restriction) {
                prize.restriction = { enabled: false, type: null, maxCount: 1 };
            }
            const value = parseInt(e.target.value);
            if (!isNaN(value) && value >= 1) {
                prize.restriction.maxCount = value;
                saveData();
                console.log('[奖品限制] 更新限制次数:', prize.name, prize.restriction.maxCount);
            }
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            if (prizes.length > 2) {
                prizes.splice(index, 1);
                renderPrizes();
                drawWheel();
                updateTotalProbability();
            }
        });
    });
    
    updateTotalProbability();
}

// 添加奖品
function addPrize() {
    prizes.push({ 
        name: `奖品${prizes.length + 1}`, 
        probability: 0,
        restriction: { enabled: false, type: null, maxCount: 1 }
    });
    renderPrizes();
    saveData();
    drawWheel();
}

// 重置奖品（使用默认配置）
function resetPrizes() {
    prizes = JSON.parse(JSON.stringify(DEFAULT_PRIZES));
    renderPrizes();
    saveData();
    drawWheel();
}

// 更新总概率显示
function updateTotalProbability() {
    const total = prizes.reduce((sum, prize) => sum + (prize.probability || 0), 0);
    // 显示2位小数，如果为整数则显示整数
    const totalText = total % 1 === 0 ? total.toString() : total.toFixed(2);
    
    const totalProbabilityEl = document.getElementById('totalProbability');
    if (totalProbabilityEl) {
        totalProbabilityEl.textContent = totalText;
    } else {
        console.warn('[更新总概率] 警告: 找不到 totalProbability 元素');
    }
    
    const warning = document.getElementById('probabilityWarning');
    if (warning) {
        // 使用更小的容差来检查是否等于100%
        if (Math.abs(total - 100) > 0.001) {
            warning.textContent = total > 100 
                ? '⚠️ 总概率超过100%，请调整！' 
                : '💡 建议总概率设为100%';
        } else {
            warning.textContent = '';
        }
    } else {
        console.warn('[更新总概率] 警告: 找不到 probabilityWarning 元素');
    }
}

// 绘制转盘
function drawWheel() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (prizes.length === 0) return;
    
    // 计算总概率
    const totalProbability = prizes.reduce((sum, p) => sum + (p.probability || 0), 0) || 100;
    
    let currentAngle = -Math.PI / 2; // 从顶部开始
    
    prizes.forEach((prize, index) => {
        const probability = prize.probability || 0;
        const angle = (probability / totalProbability) * 2 * Math.PI;
        
        // 绘制扇形
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + angle);
        ctx.closePath();
        ctx.fillStyle = colors[index % colors.length];
        ctx.fill();
        
        // 绘制边框
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 绘制文字
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(currentAngle + angle / 2);
        ctx.fillStyle = '#fff';
        ctx.font = `bold ${Math.max(14, radius / 15)}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // 文字换行处理
        const textX = radius * 0.6;
        const maxWidth = radius * 0.5;
        
        // 绘制奖品名称（显示为"奖励1"、"奖励2"等编号）
        const rewardLabel = `奖励${index + 1}`;
        ctx.fillText(rewardLabel, textX, 0);
        
        // 隐藏概率显示
        // ctx.font = `${Math.max(12, radius / 20)}px Arial`;
        // const probText = probability % 1 === 0 ? `${probability}%` : `${probability.toFixed(2)}%`;
        // ctx.fillText(probText, textX, 10);
        
        ctx.restore();
        
        currentAngle += angle;
    });
}

// 根据概率选择奖品
function selectPrizeByProbability() {
    // 检查限制奖项是否可用
    const restrictedPrizes = checkRestrictedPrizes();
    
    // 计算有效概率（排除受限奖项的概率）
    let validPrizes = [];
    let validTotalProbability = 0;
    
    for (let i = 0; i < prizes.length; i++) {
        const prize = prizes[i];
        const isRestricted = restrictedPrizes.has(i);
        
        if (!isRestricted) {
            validPrizes.push({ index: i, prize: prize });
            validTotalProbability += prize.probability || 0;
        }
    }
    
    // 如果没有可用奖项，返回第一个（理论上不应该发生）
    if (validPrizes.length === 0) {
        console.warn('[抽奖] 警告: 所有奖项都被限制，返回第一个奖项');
        return 0;
    }
    
    // 如果有效概率为0，随机选择可用奖项
    if (validTotalProbability <= 0) {
        const randomIndex = Math.floor(Math.random() * validPrizes.length);
        return validPrizes[randomIndex].index;
    }
    
    // 根据有效概率选择
    const random = Math.random() * validTotalProbability;
    let cumulative = 0;
    
    for (let validPrize of validPrizes) {
        cumulative += validPrize.prize.probability || 0;
        if (random <= cumulative) {
            return validPrize.index;
        }
    }
    
    // 兜底：返回最后一个可用奖项
    return validPrizes[validPrizes.length - 1].index;
}

// 检查限制奖项，返回受限奖项的索引集合
function checkRestrictedPrizes() {
    const restricted = new Set();
    const today = new Date();
    
    prizes.forEach((prize, index) => {
        // 检查是否启用限制
        if (!prize.restriction || !prize.restriction.enabled || !prize.restriction.type) {
            return; // 没有限制，跳过
        }
        
        const restriction = prize.restriction;
        const prizeName = prize.name;
        
        // 查找该奖项的抽奖历史
        const historyForPrize = prizeHistory.filter(h => h.prizeName === prizeName);
        
        // 根据限制类型检查
        let limitDate = null;
        if (restriction.type === 'year') {
            limitDate = new Date(today);
            limitDate.setFullYear(limitDate.getFullYear() - 1);
        } else if (restriction.type === 'month') {
            limitDate = new Date(today);
            limitDate.setMonth(limitDate.getMonth() - 1);
        } else if (restriction.type === 'day') {
            limitDate = new Date(today);
            limitDate.setDate(limitDate.getDate() - 1);
        }
        
        if (limitDate) {
            // 统计在限制时间内的抽奖次数
            const countInPeriod = historyForPrize.filter(h => {
                const winDate = new Date(h.date);
                return winDate > limitDate;
            }).length;
            
            // 如果已达到最大次数，限制该奖项
            if (countInPeriod >= restriction.maxCount) {
                restricted.add(index);
                const periodText = restriction.type === 'year' ? '一年内' : 
                                 restriction.type === 'month' ? '一个月内' : '一天内';
                console.log(`[抽奖限制] ${prizeName}在${periodText}已抽到${countInPeriod}次（限制${restriction.maxCount}次），跳过`);
            }
        }
    });
    
    return restricted;
}

// 转盘抽奖
function spinWheel() {
    if (!hasSelectedUser()) {
        showNoUserWarning();
        return;
    }
    
    if (isSpinning || prizes.length === 0) return;
    
    // 检查积分是否足够
    if (currentPoints < spinCost) {
        alert(`积分不足！需要 ${spinCost} 积分，当前只有 ${currentPoints} 积分。`);
        return;
    }
    
    // 消耗积分
    currentPoints -= spinCost;
    totalSpins++; // 增加抽奖次数
    saveData();
    
    isSpinning = true;
    const spinBtn = document.getElementById('spinBtn');
    if (spinBtn) {
        spinBtn.disabled = true;
        spinBtn.textContent = '抽奖中...';
    } else {
        console.error('[转盘抽奖] 错误: 找不到 spinBtn 元素');
        isSpinning = false;
        return;
    }
    
    const resultDisplay = document.getElementById('result');
    if (resultDisplay) {
        resultDisplay.classList.remove('show');
    } else {
        console.error('[转盘抽奖] 错误: 找不到 result 元素');
    }
    
    // 根据概率选择奖品（会自动排除受限奖项）
    const selectedIndex = selectPrizeByProbability();
    const selectedPrize = prizes[selectedIndex];
    
    // 记录抽奖历史（记录所有抽奖）
    const today = getTodayDateString();
    const now = new Date();
    prizeHistory.push({
        prizeName: selectedPrize.name,
        date: today,
        cost: spinCost,
        timestamp: now.getTime() // 记录精确时间戳，用于排序和显示
    });
    saveData(); // 立即保存，确保历史记录不丢失
    console.log('[抽奖记录] 记录抽奖:', selectedPrize.name, '日期:', today, '消耗:', spinCost, '积分');
    
    // 计算选中扇形的角度
    const totalProbability = prizes.reduce((sum, p) => sum + (p.probability || 0), 0) || 100;
    let targetAngle = -Math.PI / 2; // 起始角度（顶部）
    
    for (let i = 0; i < selectedIndex; i++) {
        const probability = prizes[i].probability || 0;
        targetAngle += (probability / totalProbability) * 2 * Math.PI;
    }
    
    // 选中扇形的中间位置
    const probability = selectedPrize.probability || 0;
    targetAngle += (probability / totalProbability) * Math.PI;
    
    // 转换为度数并添加多圈旋转
    const rotations = 5; // 转5圈
    const finalAngle = (targetAngle * 180 / Math.PI) + (rotations * 360);
    
    // 动画
    let startAngle = 0;
    const duration = 3000; // 3秒
    const startTime = Date.now();
    
    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用ease-out缓动函数
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentAngle = startAngle + (finalAngle * easeOut);
        
        // 应用旋转到画布
        canvas.style.transform = `rotate(${currentAngle}deg)`;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // 动画结束
            setTimeout(() => {
                if (resultDisplay) {
                    resultDisplay.textContent = `🎉 恭喜获得：${selectedPrize.name} 🎉`;
                    resultDisplay.classList.add('show');
                } else {
                    console.error('[转盘抽奖] 错误: 找不到 result 元素');
                }
                
                updatePointsDisplay();
                checkAchievements(); // 检查抽奖相关成就
                isSpinning = false;
            }, 300);
        }
    };
    
    animate();
}

// ============ 任务管理系统 ============

// 数据持久化 - 加载
function loadData() {
    console.log('[数据加载] 开始加载数据');
    
    // 加载用户列表
    const savedUsers = localStorage.getItem('users');
    const savedCurrentUserId = localStorage.getItem('currentUserId');
    const savedPrizes = localStorage.getItem('prizes');
    
    if (savedUsers) {
        users = JSON.parse(savedUsers);
        console.log('[数据加载] 加载用户列表，用户数量:', users.length);
    } else {
        users = [];
        console.log('[数据加载] 没有保存的用户，创建新列表');
    }
    
    if (savedCurrentUserId) {
        currentUserId = savedCurrentUserId;
        console.log('[数据加载] 当前用户ID:', currentUserId);
    }
    
    // 加载奖品配置（全局共享）
    if (savedPrizes) {
        prizes = JSON.parse(savedPrizes);
        console.log('[数据加载] 加载奖品配置');
    } else {
        // 如果没有保存的配置，使用默认配置
        prizes = JSON.parse(JSON.stringify(DEFAULT_PRIZES));
        console.log('[数据加载] 使用默认奖品配置');
    }
    
    // 如果有用户，加载当前用户数据
    if (currentUserId && users.length > 0) {
        const currentUser = users.find(u => u.id === currentUserId);
        if (currentUser) {
            loadUserData(currentUser);
            console.log('[数据加载] 加载当前用户数据:', currentUser.name);
        } else {
            // 如果找不到当前用户，选择第一个用户
            if (users.length > 0) {
                switchUser(users[0].id);
            }
        }
    } else if (users.length > 0) {
        // 如果没有当前用户但有用户列表，选择第一个
        switchUser(users[0].id);
    } else {
        // 如果没有用户，初始化默认数据
        initDefaultData();
        console.log('[数据加载] 初始化默认数据');
    }
    
    // 记录今日打开
    recordTodayOpen();
}

// 加载用户数据到当前变量
function loadUserData(user) {
    tasks = user.tasks || getDefaultTasks();
    currentPoints = user.currentPoints !== undefined ? user.currentPoints : 100;
    spinCost = user.spinCost !== undefined ? user.spinCost : 100;
    completionHistory = user.completionHistory || {};
    lastCompletionDate = user.lastCompletionDate || null;
    streakDays = user.streakDays || 0;
    totalTasksCompleted = user.totalTasksCompleted || 0;
    totalPointsEarned = user.totalPointsEarned || 0;
    maxStreakDays = user.maxStreakDays || 0;
    unlockedAchievements = user.unlockedAchievements || [];
    totalSpins = user.totalSpins || 0;
    allTasksCompletedDays = user.allTasksCompletedDays || 0;
    weeklyPerfectDays = user.weeklyPerfectDays || 0;
    prizeHistory = user.prizeHistory || [];
}

// 初始化默认数据
function initDefaultData() {
    tasks = getDefaultTasks();
    currentPoints = 0;
    spinCost = 100;
    completionHistory = {};
    lastCompletionDate = null;
    streakDays = 0;
    totalTasksCompleted = 0;
    totalPointsEarned = 0;
    maxStreakDays = 0;
    unlockedAchievements = [];
    totalSpins = 0;
    allTasksCompletedDays = 0;
    weeklyPerfectDays = 0;
    prizeHistory = [];
}

// 数据持久化 - 保存
function saveData() {
    console.log('[数据保存] 开始保存数据');
    
    // 保存奖品配置（全局共享）
    localStorage.setItem('prizes', JSON.stringify(prizes));
    
    // 如果有当前用户，保存用户数据
    if (currentUserId && users.length > 0) {
        const currentUser = users.find(u => u.id === currentUserId);
        if (currentUser) {
            // 更新当前用户的数据
            currentUser.tasks = tasks;
            currentUser.currentPoints = currentPoints;
            currentUser.spinCost = spinCost;
            currentUser.completionHistory = completionHistory;
            currentUser.lastCompletionDate = lastCompletionDate;
            currentUser.streakDays = streakDays;
            currentUser.totalTasksCompleted = totalTasksCompleted;
            currentUser.totalPointsEarned = totalPointsEarned;
            currentUser.maxStreakDays = maxStreakDays;
            currentUser.unlockedAchievements = unlockedAchievements;
            currentUser.totalSpins = totalSpins;
            currentUser.allTasksCompletedDays = allTasksCompletedDays;
            currentUser.weeklyPerfectDays = weeklyPerfectDays;
            currentUser.prizeHistory = prizeHistory;
            
            // 更新打开记录
            const today = getTodayDateString();
            if (!currentUser.openHistory) {
                currentUser.openHistory = {};
            }
            currentUser.openHistory[today] = true;
            
            console.log('[数据保存] 已更新用户数据:', currentUser.name);
        }
    }
    
    // 保存用户列表
    localStorage.setItem('users', JSON.stringify(users));
    
    // 保存当前用户ID
    if (currentUserId) {
        localStorage.setItem('currentUserId', currentUserId);
    }
    
    console.log('[数据保存] 数据保存完成');
}

// 检查是否是新的一天
function checkNewDay() {
    const today = getTodayDateString();
    
    // 如果最后完成日期不是今天，重置所有任务的完成状态
    if (lastCompletionDate !== today) {
        // 检查是否连续完成（昨天有完成记录）
        const yesterday = getYesterdayDateString();
        if (lastCompletionDate === yesterday) {
            // 连续完成，增加连续天数
            streakDays++;
            // 更新最高连续天数
            if (streakDays > maxStreakDays) {
                maxStreakDays = streakDays;
            }
        } else if (lastCompletionDate && lastCompletionDate !== today) {
            // 中断了，重置连续天数
            streakDays = 0;
        }
        
        // 重置今天的任务完成状态
        tasks.forEach(task => {
            task.completedToday = false;
        });
        
        saveData();
        renderTasks();
        updateStreakDisplay();
    }
}

// 获取今天的日期字符串
function getTodayDateString() {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

// 获取昨天的日期字符串
function getYesterdayDateString() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
}

// 更新积分显示
function updatePointsDisplay() {
    console.log('[更新积分显示] 开始更新, 当前积分:', currentPoints, ', 消耗积分:', spinCost);
    
    const currentPointsEl = document.getElementById('currentPoints');
    const spinCostEl = document.getElementById('spinCost');
    const spinCostDisplayEl = document.getElementById('spinCostDisplay');
    
    if (currentPointsEl) {
        currentPointsEl.textContent = currentPoints;
    } else {
        console.warn('[更新积分显示] 警告: 找不到 currentPoints 元素');
    }
    
    if (spinCostEl) {
        spinCostEl.textContent = spinCost;
    } else {
        console.warn('[更新积分显示] 警告: 找不到 spinCost 元素');
    }
    
    if (spinCostDisplayEl) {
        spinCostDisplayEl.textContent = spinCost;
    } else {
        console.warn('[更新积分显示] 警告: 找不到 spinCostDisplay 元素');
    }
    
    // 更新抽奖按钮状态
    const spinBtn = document.getElementById('spinBtn');
    if (spinBtn) {
        if (currentPoints < spinCost) {
            spinBtn.disabled = true;
            spinBtn.innerHTML = `积分不足 (需要 <span>${spinCost}</span> 积分)`;
            console.log('[更新积分显示] 按钮已禁用 - 积分不足');
        } else {
            spinBtn.disabled = false;
            spinBtn.innerHTML = `开始抽奖 (<span>${spinCost}</span> 积分)`;
            console.log('[更新积分显示] 按钮已启用 - 可以抽奖');
        }
        console.log('[更新积分显示] 按钮最终状态 - disabled:', spinBtn.disabled, ', innerHTML:', spinBtn.innerHTML);
    } else {
        console.error('[更新积分显示] 错误: 找不到抽奖按钮元素');
    }
}

// 显示配置抽奖消耗对话框
function showCostModal() {
    if (!hasSelectedUser()) {
        showNoUserWarning();
        return;
    }
    
    const costInput = document.getElementById('costInput');
    costInput.value = spinCost;
    document.getElementById('costModal').classList.add('show');
    // 聚焦到输入框并选中文本，方便快速修改
    setTimeout(() => {
        costInput.focus();
        costInput.select();
    }, 100);
}

// 隐藏配置抽奖消耗对话框
function hideCostModal() {
    document.getElementById('costModal').classList.remove('show');
}

// 确认修改抽奖消耗
function confirmCostChange() {
    console.log('[配置抽奖消耗] 开始修改抽奖消耗积分');
    const costInput = document.getElementById('costInput');
    const newCost = parseInt(costInput.value);
    console.log('[配置抽奖消耗] 输入的新消耗值:', newCost);
    console.log('[配置抽奖消耗] 当前积分:', currentPoints);
    console.log('[配置抽奖消耗] 旧消耗值:', spinCost);
    
    if (newCost && newCost > 0) {
        // 更新抽奖消耗值
        spinCost = newCost;
        console.log('[配置抽奖消耗] 更新 spinCost 为:', spinCost);
        saveData();
        
        // 关闭弹窗
        hideCostModal();
        console.log('[配置抽奖消耗] 弹窗已关闭');
        
        // 立即强制更新所有相关显示
        // 更新积分显示区域
        const currentPointsEl = document.getElementById('currentPoints');
        const spinCostEl = document.getElementById('spinCost');
        const spinCostDisplayEl = document.getElementById('spinCostDisplay');
        
        if (currentPointsEl) {
            currentPointsEl.textContent = currentPoints;
        } else {
            console.warn('[配置抽奖消耗] 警告: 找不到 currentPoints 元素');
        }
        
        if (spinCostEl) {
            spinCostEl.textContent = spinCost;
        } else {
            console.warn('[配置抽奖消耗] 警告: 找不到 spinCost 元素');
        }
        
        if (spinCostDisplayEl) {
            spinCostDisplayEl.textContent = spinCost;
        } else {
            console.warn('[配置抽奖消耗] 警告: 找不到 spinCostDisplay 元素');
        }
        
        console.log('[配置抽奖消耗] 积分显示区域已更新');
        
        // 立即同步更新抽奖按钮状态
        const spinBtn = document.getElementById('spinBtn');
        if (spinBtn) {
            console.log('[配置抽奖消耗] 找到抽奖按钮，开始更新状态');
            
            // 先更新按钮内部的消耗积分显示
            const costDisplaySpan = spinBtn.querySelector('#spinCostDisplay') || 
                                   document.getElementById('spinCostDisplay');
            if (costDisplaySpan) {
                costDisplaySpan.textContent = spinCost;
                console.log('[配置抽奖消耗] 按钮内 span 已更新为:', spinCost);
            }
            
            // 根据新的抽奖消耗和当前积分计算是否可以抽奖
            const canSpin = currentPoints >= spinCost;
            console.log('[配置抽奖消耗] 是否可以抽奖:', canSpin, '(当前积分:', currentPoints, '>= 消耗积分:', spinCost, ')');
            
            // 更新按钮的完整状态
            if (!canSpin) {
                // 积分不足 - 禁用按钮
                spinBtn.setAttribute('disabled', 'disabled');
                spinBtn.innerHTML = `积分不足 (需要 <span id="spinCostDisplay">${spinCost}</span> 积分)`;
                console.log('[配置抽奖消耗] 按钮状态: 已禁用 - 积分不足');
            } else {
                // 积分足够 - 启用按钮
                spinBtn.removeAttribute('disabled');
                spinBtn.innerHTML = `开始抽奖 (<span id="spinCostDisplay">${spinCost}</span> 积分)`;
                console.log('[配置抽奖消耗] 按钮状态: 已启用 - 可以抽奖');
            }
            
            console.log('[配置抽奖消耗] 按钮 disabled 属性:', spinBtn.disabled);
            console.log('[配置抽奖消耗] 按钮 innerHTML:', spinBtn.innerHTML);
        } else {
            console.error('[配置抽奖消耗] 错误: 找不到抽奖按钮元素');
        }
        
        // 确保 updatePointsDisplay 也更新了（双重保险）
        updatePointsDisplay();
        console.log('[配置抽奖消耗] 完成更新，调用 updatePointsDisplay()');
    } else {
        // 输入无效时提示用户，但不关闭弹窗
        console.warn('[配置抽奖消耗] 输入无效:', newCost);
        alert('请输入有效的积分数量（大于0的正整数）');
        costInput.focus();
    }
}

// 更新连续完成显示
function updateStreakDisplay() {
    const streakDaysEl = document.getElementById('streakDays');
    const streakBonusEl = document.getElementById('streakBonus');
    
    if (streakDaysEl) {
        streakDaysEl.textContent = streakDays;
    } else {
        console.warn('[更新连续完成显示] 警告: 找不到 streakDays 元素');
        return;
    }
    
    // 显示连续完成奖励提示（每7天一次奖励）
    if (streakBonusEl) {
        if (streakDays >= 7) {
            const bonus = Math.floor(streakDays / 7) * 20;
            streakBonusEl.textContent = `下次奖励：连续${((Math.floor(streakDays / 7) + 1) * 7)}天 +${((Math.floor(streakDays / 7) + 1) * 20)}积分`;
            streakBonusEl.style.display = 'inline';
        } else {
            streakBonusEl.style.display = 'none';
        }
    } else {
        console.warn('[更新连续完成显示] 警告: 找不到 streakBonus 元素');
    }
    
    // 更新本周进度
    updateWeekProgress();
}

// 更新本周进度
function updateWeekProgress() {
    const weekDaysEl = document.getElementById('weekDays');
    if (!weekDaysEl) {
        console.warn('[更新本周进度] 警告: 找不到 weekDays 元素');
        return;
    }
    weekDaysEl.innerHTML = '';
    
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = 周日, 1 = 周一, ...
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);
    
    const dayNames = ['日', '一', '二', '三', '四', '五', '六'];
    const todayString = getTodayDateString();
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        
        const dayEl = document.createElement('div');
        dayEl.className = 'day-indicator';
        dayEl.textContent = dayNames[i];
        dayEl.dataset.date = dateString;
        dayEl.style.cursor = 'pointer';
        
        // 检查这一天是否有完成记录
        if (completionHistory[dateString] && completionHistory[dateString].length > 0) {
            dayEl.classList.add('completed');
        }
        
        // 标记今天
        if (dateString === todayString) {
            dayEl.classList.add('today');
        }
        
        // 标记当前查看的日期
        if (viewingDate && dateString === viewingDate) {
            dayEl.classList.add('viewing');
        } else if (!viewingDate && dateString === todayString) {
            // 如果没有指定查看日期，默认查看今天
            dayEl.classList.add('viewing');
        }
        
        // 添加点击事件
        dayEl.addEventListener('click', () => {
            switchViewingDate(dateString);
        });
        
        weekDaysEl.appendChild(dayEl);
    }
    
    // 更新查看日期指示器
    updateViewingDateIndicator();
}

// 切换查看的日期
function switchViewingDate(dateString) {
    if (!hasSelectedUser()) {
        showNoUserWarning();
        return;
    }
    
    viewingDate = dateString;
    const todayString = getTodayDateString();
    
    // 更新任务列表显示该日期的完成状态
    renderTasks();
    
    // 更新进度显示
    updateTodayProgress();
    
    // 更新本周进度（高亮当前查看的日期）
    updateWeekProgress();
    
    // 更新查看日期指示器
    updateViewingDateIndicator();
    
    console.log('[切换查看日期] 查看日期:', dateString);
}

// 返回今天
function backToToday() {
    viewingDate = null;
    renderTasks();
    updateTodayProgress();
    updateWeekProgress();
    updateViewingDateIndicator();
    console.log('[返回今天] 已切换到今天');
}

// 更新查看日期指示器
function updateViewingDateIndicator() {
    const indicator = document.getElementById('viewingDateIndicator');
    const backBtn = document.getElementById('backToTodayBtn');
    const todayString = getTodayDateString();
    
    if (indicator) {
        if (viewingDate && viewingDate !== todayString) {
            const date = new Date(viewingDate);
            const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', 
                               '七月', '八月', '九月', '十月', '十一月', '十二月'];
            indicator.textContent = `查看: ${date.getMonth() + 1}月${date.getDate()}日`;
            indicator.style.display = 'inline';
        } else {
            indicator.textContent = '';
            indicator.style.display = 'none';
        }
    }
    
    if (backBtn) {
        if (viewingDate && viewingDate !== todayString) {
            backBtn.style.display = 'inline-block';
        } else {
            backBtn.style.display = 'none';
        }
    }
}

// 获取指定日期字符串
function getDateString(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

// 计算指定日期获得的积分
function getPointsForDate(dateString) {
    if (!completionHistory[dateString] || completionHistory[dateString].length === 0) {
        return 0;
    }
    
    let points = 0;
    const taskIds = completionHistory[dateString];
    
    taskIds.forEach(taskId => {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            points += task.points;
        }
    });
    
    return points;
}

// 渲染日历
function renderCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthEl = document.getElementById('currentMonth');
    
    if (!calendarGrid) {
        console.warn('[渲染日历] 警告: 找不到 calendarGrid 元素');
        return;
    }
    
    if (currentMonthEl) {
        const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', 
                           '七月', '八月', '九月', '十月', '十一月', '十二月'];
        currentMonthEl.textContent = `${currentCalendarYear}年 ${monthNames[currentCalendarMonth]}`;
    }
    
    // 清空日历
    calendarGrid.innerHTML = '';
    
    // 添加星期标题
    const dayNames = ['日', '一', '二', '三', '四', '五', '六'];
    dayNames.forEach(dayName => {
        const headerEl = document.createElement('div');
        headerEl.className = 'calendar-day-header';
        headerEl.textContent = dayName;
        calendarGrid.appendChild(headerEl);
    });
    
    // 获取当前月份的第一天
    const firstDay = new Date(currentCalendarYear, currentCalendarMonth, 1);
    const lastDay = new Date(currentCalendarYear, currentCalendarMonth + 1, 0);
    
    // 获取第一天是星期几（0 = 周日）
    const startDayOfWeek = firstDay.getDay();
    
    // 获取上个月的最后几天
    const prevMonthLastDay = new Date(currentCalendarYear, currentCalendarMonth, 0).getDate();
    
    // 填充上个月的日期
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
        const day = prevMonthLastDay - i;
        const date = new Date(currentCalendarYear, currentCalendarMonth - 1, day);
        const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        const dayEl = createCalendarDay(day, dateString, true);
        calendarGrid.appendChild(dayEl);
    }
    
    // 填充当前月的日期
    const today = new Date();
    const todayString = getTodayDateString();
    
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dateString = `${currentCalendarYear}-${String(currentCalendarMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = dateString === todayString;
        const dayEl = createCalendarDay(day, dateString, false, isToday);
        calendarGrid.appendChild(dayEl);
    }
    
    // 填充下个月的前几天（补齐到42个格子，6行×7列）
    const totalCells = calendarGrid.children.length - 7; // 减去星期标题
    const remainingCells = 42 - totalCells;
    
    for (let day = 1; day <= remainingCells; day++) {
        const date = new Date(currentCalendarYear, currentCalendarMonth + 1, day);
        const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        const dayEl = createCalendarDay(day, dateString, true);
        calendarGrid.appendChild(dayEl);
    }
    
    // 更新日历的UI状态
    updateUIForUserSelection();
}

// 创建日历日期元素
function createCalendarDay(day, dateString, isOtherMonth, isToday = false) {
    const dayEl = document.createElement('div');
    dayEl.className = 'calendar-day';
    
    if (isOtherMonth) {
        dayEl.classList.add('other-month');
    }
    
    if (isToday) {
        dayEl.classList.add('today');
    }
    
    // 检查这一天是否有数据
    const points = getPointsForDate(dateString);
    if (points > 0) {
        dayEl.classList.add('has-data');
    }
    
    // 添加日期数字
    const dayNumberEl = document.createElement('span');
    dayNumberEl.className = 'calendar-day-number';
    dayNumberEl.textContent = day;
    dayEl.appendChild(dayNumberEl);
    
    // 如果有积分，显示积分
    if (points > 0) {
        const pointsEl = document.createElement('span');
        pointsEl.className = 'calendar-day-points';
        pointsEl.textContent = `+${points}`;
        dayEl.appendChild(pointsEl);
    }
    
    // 添加点击事件
    dayEl.addEventListener('click', () => {
        if (hasSelectedUser()) {
            showDayDetails(dateString, points, day);
        } else {
            showNoUserWarning();
        }
    });
    
    return dayEl;
}

// 显示日期详情
function showDayDetails(dateString, points, day) {
    if (!hasSelectedUser()) {
        showNoUserWarning();
        return;
    }
    
    // 获取当天的任务完成情况
    const taskIds = completionHistory[dateString] || [];
    const completedTasks = taskIds.map(taskId => {
        const task = tasks.find(t => t.id === taskId);
        return task ? { name: task.name, points: task.points } : null;
    }).filter(t => t !== null);
    
    const date = new Date(dateString);
    const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', 
                       '七月', '八月', '九月', '十月', '十一月', '十二月'];
    const dateText = `${date.getFullYear()}年${monthNames[date.getMonth()]}${day}日`;
    
    let message = `📅 ${dateText}\n\n`;
    
    if (points > 0) {
        message += `🎉 获得积分：${points} 分\n\n`;
        message += `✅ 完成任务：\n`;
        completedTasks.forEach((task, index) => {
            message += `${index + 1}. ${task.name} (+${task.points}分)\n`;
        });
    } else {
        message += `📝 这一天没有完成任何任务`;
    }
    
    alert(message);
}

// 渲染任务列表
function renderTasks() {
    const taskList = document.getElementById('taskList');
    if (!taskList) {
        console.warn('[渲染任务] 警告: 找不到 taskList 元素');
        return;
    }
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        taskList.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">还没有任务，点击"添加任务"开始吧！</p>';
        return;
    }
    
    // 确定当前查看的日期
    const todayString = getTodayDateString();
    const currentViewDate = viewingDate || todayString;
    const isViewingToday = currentViewDate === todayString;
    
    // 获取当前查看日期的完成记录
    const completedTaskIds = completionHistory[currentViewDate] || [];
    
    tasks.forEach((task) => {
        // 根据查看的日期确定任务是否完成
        const isCompleted = completedTaskIds.includes(task.id);
        
        // 如果查看的是今天，使用completedToday；否则使用历史记录
        const displayCompleted = isViewingToday ? task.completedToday : isCompleted;
        
        const taskItem = document.createElement('div');
        taskItem.className = `task-item ${displayCompleted ? 'completed' : ''}`;
        // 转义HTML特殊字符，防止XSS
        const escapedName = task.name
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
        taskItem.innerHTML = `
            <textarea class="task-name" data-id="${task.id}" placeholder="任务名称" rows="1"
                   ${!isViewingToday ? 'readonly style="background: #f8f9fa; cursor: not-allowed;"' : ''}>${escapedName}</textarea>
            <input type="number" class="points-input" value="${task.points}" 
                   min="1" data-id="${task.id}" placeholder="积分"
                   ${!isViewingToday ? 'readonly style="background: #f8f9fa; cursor: not-allowed;"' : ''}>
            <button class="check-btn" data-id="${task.id}" 
                    title="${isViewingToday ? '完成任务' : '历史记录（已完成）'}"
                    ${!isViewingToday ? 'disabled style="opacity: 0.6; cursor: not-allowed;"' : ''}>
                ${displayCompleted ? '✓' : '○'}
            </button>
            <button class="delete-task-btn" data-id="${task.id}" 
                    ${tasks.length <= 1 ? 'disabled' : ''}
                    ${!isViewingToday ? 'disabled style="opacity: 0.6; cursor: not-allowed;"' : ''}>×</button>
        `;
        
        taskList.appendChild(taskItem);
    });
    
    // 更新UI状态
    updateUIForUserSelection();
    
    // 绑定事件
    document.querySelectorAll('.task-name').forEach(textarea => {
        // 自动调整 textarea 高度
        const autoResize = (element) => {
            element.style.height = 'auto';
            const scrollHeight = element.scrollHeight;
            const maxHeight = 120; // 最大高度（px）
            element.style.height = Math.min(scrollHeight, maxHeight) + 'px';
        };
        
        // 初始化时调整高度
        autoResize(textarea);
        
        textarea.addEventListener('input', (e) => {
            // 自动调整高度
            autoResize(e.target);
            
            if (!hasSelectedUser()) {
                showNoUserWarning();
                const task = tasks.find(t => t.id === parseInt(e.target.dataset.id));
                if (task) {
                    e.target.value = task.name;
                    autoResize(e.target);
                }
                return;
            }
            const id = parseInt(e.target.dataset.id);
            const task = tasks.find(t => t.id === id);
            if (task) {
                task.name = e.target.value;
                saveData();
            }
        });
        
        // 失焦时也调整高度
        textarea.addEventListener('blur', (e) => {
            autoResize(e.target);
        });
    });
    
    document.querySelectorAll('.points-input').forEach(input => {
        input.addEventListener('input', (e) => {
            if (!hasSelectedUser()) {
                showNoUserWarning();
                const task = tasks.find(t => t.id === parseInt(e.target.dataset.id));
                if (task) {
                    e.target.value = task.points;
                }
                return;
            }
            const id = parseInt(e.target.dataset.id);
            const task = tasks.find(t => t.id === id);
            if (task) {
                const value = parseInt(e.target.value) || 1;
                task.points = Math.max(1, value);
                e.target.value = task.points;
                saveData();
            }
        });
    });
    
    document.querySelectorAll('.check-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            toggleTaskComplete(id);
        });
    });
    
    document.querySelectorAll('.delete-task-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            if (tasks.length > 1) {
                deleteTask(id);
            }
        });
    });
}

// 检查是否有选中的用户
function hasSelectedUser() {
    return currentUserId !== null && users.some(u => u.id === currentUserId);
}

// 显示未选择用户的提示
function showNoUserWarning() {
    alert('请先选择用户！\n点击"用户管理"按钮添加或选择用户。');
}

// 根据用户选择状态更新UI
function updateUIForUserSelection() {
    const hasUser = hasSelectedUser();
    
    // 抽奖按钮
    const spinBtn = document.getElementById('spinBtn');
    if (spinBtn) {
        if (!hasUser) {
            spinBtn.disabled = true;
            spinBtn.style.opacity = '0.5';
            spinBtn.style.cursor = 'not-allowed';
            spinBtn.innerHTML = '请先选择用户';
        } else {
            spinBtn.disabled = false;
            spinBtn.style.opacity = '1';
            spinBtn.style.cursor = 'pointer';
        }
    }
    
    // 添加任务按钮
    const addTaskBtn = document.getElementById('addTaskBtn');
    if (addTaskBtn) {
        addTaskBtn.disabled = !hasUser;
        addTaskBtn.style.opacity = hasUser ? '1' : '0.5';
        addTaskBtn.style.cursor = hasUser ? 'pointer' : 'not-allowed';
    }
    
    // 配置抽奖消耗按钮
    const costConfigBtn = document.getElementById('costConfigBtn');
    if (costConfigBtn) {
        costConfigBtn.disabled = !hasUser;
        costConfigBtn.style.opacity = hasUser ? '1' : '0.5';
        costConfigBtn.style.cursor = hasUser ? 'pointer' : 'not-allowed';
    }
    
    // 统计按钮
    const showStatsBtn = document.getElementById('showStatsBtn');
    if (showStatsBtn) {
        showStatsBtn.disabled = !hasUser;
        showStatsBtn.style.opacity = hasUser ? '1' : '0.5';
        showStatsBtn.style.cursor = hasUser ? 'pointer' : 'not-allowed';
    }
    
    // 日历导航按钮
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn');
    if (prevMonthBtn) {
        prevMonthBtn.disabled = !hasUser;
        prevMonthBtn.style.opacity = hasUser ? '1' : '0.5';
        prevMonthBtn.style.cursor = hasUser ? 'pointer' : 'not-allowed';
    }
    if (nextMonthBtn) {
        nextMonthBtn.disabled = !hasUser;
        nextMonthBtn.style.opacity = hasUser ? '1' : '0.5';
        nextMonthBtn.style.cursor = hasUser ? 'pointer' : 'not-allowed';
    }
    
    // 更新任务列表中的按钮和输入框
    document.querySelectorAll('.check-btn').forEach(btn => {
        btn.disabled = !hasUser;
        btn.style.opacity = hasUser ? '1' : '0.5';
        btn.style.cursor = hasUser ? 'pointer' : 'not-allowed';
    });
    
    document.querySelectorAll('.delete-task-btn').forEach(btn => {
        btn.disabled = !hasUser;
        btn.style.opacity = hasUser ? '1' : '0.5';
        btn.style.cursor = hasUser ? 'pointer' : 'not-allowed';
    });
    
    document.querySelectorAll('.task-name-input').forEach(input => {
        input.disabled = !hasUser;
        input.style.opacity = hasUser ? '1' : '0.5';
    });
    
    document.querySelectorAll('.points-input').forEach(input => {
        input.disabled = !hasUser;
        input.style.opacity = hasUser ? '1' : '0.5';
    });
    
    // 日历日期点击
    document.querySelectorAll('.calendar-day').forEach(day => {
        if (!hasUser) {
            day.style.opacity = '0.5';
            day.style.cursor = 'not-allowed';
        } else {
            day.style.opacity = '1';
            day.style.cursor = 'pointer';
        }
    });
}

// 检查每日完成度奖励
function checkDailyCompletionBonus(dateString, completedCount, totalTasks) {
    if (!totalTasks || totalTasks === 0) return;
    
    const completionRate = completedCount / totalTasks;
    const halfCompleteKey = `half_completed_${dateString}`;
    const threeQuarterCompleteKey = `three_quarter_completed_${dateString}`;
    const allCompleteKey = `all_completed_bonus_${dateString}`;
    
    // 先检查是否完成100%（优先级最高，只给10分，不给其他奖励）
    if (completionRate === 1 && !completionHistory[allCompleteKey]) {
        // 完成所有任务，额外加10分
        const bonusPoints = 10;
        currentPoints += bonusPoints;
        totalPointsEarned += bonusPoints;
        completionHistory[allCompleteKey] = true;
        
        setTimeout(() => {
            showCelebration('🎉 完成度奖励', bonusPoints, `完成所有任务，额外获得 ${bonusPoints} 积分！`);
        }, 800);
        
        console.log('[每日完成度奖励] 完成100%，奖励', bonusPoints, '积分');
        return; // 完成100%就不检查其他奖励了
    }
    
    // 检查是否完成75%（且未完成100%）
    if (completionRate >= 0.75 && completionRate < 1 && !completionHistory[threeQuarterCompleteKey] && !completionHistory[allCompleteKey]) {
        // 完成75%任务，额外加5分
        const bonusPoints = 5;
        currentPoints += bonusPoints;
        totalPointsEarned += bonusPoints;
        completionHistory[threeQuarterCompleteKey] = true;
        
        setTimeout(() => {
            showCelebration('🎉 完成度奖励', bonusPoints, `完成75%任务，额外获得 ${bonusPoints} 积分！`);
        }, 800);
        
        console.log('[每日完成度奖励] 完成75%，奖励', bonusPoints, '积分');
        return; // 完成75%就不检查50%了
    }
    
    // 检查是否完成50%（且未完成75%和100%）
    if (completionRate >= 0.5 && completionRate < 0.75 && !completionHistory[halfCompleteKey] && !completionHistory[threeQuarterCompleteKey] && !completionHistory[allCompleteKey]) {
        // 完成50%任务，额外加2分
        const bonusPoints = 2;
        currentPoints += bonusPoints;
        totalPointsEarned += bonusPoints;
        completionHistory[halfCompleteKey] = true;
        
        setTimeout(() => {
            showCelebration('🎉 完成度奖励', bonusPoints, `完成50%任务，额外获得 ${bonusPoints} 积分！`);
        }, 800);
        
        console.log('[每日完成度奖励] 完成50%，奖励', bonusPoints, '积分');
    }
}

// 切换任务完成状态
function toggleTaskComplete(taskId) {
    if (!hasSelectedUser()) {
        showNoUserWarning();
        return;
    }
    
    // 检查是否在查看今天，如果不是今天则不允许修改
    const todayString = getTodayDateString();
    const currentViewDate = viewingDate || todayString;
    if (currentViewDate !== todayString) {
        alert('只能修改今天的任务完成状态。如需修改历史记录，请先点击"返回今天"按钮。');
        return;
    }
    
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const today = getTodayDateString();
    
    if (task.completedToday) {
        // 取消完成
        task.completedToday = false;
        
        // 从完成记录中移除
        if (completionHistory[today]) {
            const index = completionHistory[today].indexOf(taskId);
            if (index > -1) {
                completionHistory[today].splice(index, 1);
            }
        }
        
        // 扣除积分（如果今天已经给过积分）
        if (lastCompletionDate === today) {
            currentPoints = Math.max(0, currentPoints - task.points);
            totalPointsEarned = Math.max(0, totalPointsEarned - task.points);
            totalTasksCompleted = Math.max(0, totalTasksCompleted - 1);
        }
        
        // 重新检查完成度奖励（取消任务后可能不再满足50%、75%或100%）
        const completedCountAfterCancel = completionHistory[today] ? completionHistory[today].length : 0;
        const totalTasks = tasks.length;
        const halfCompleteKey = `half_completed_${today}`;
        const threeQuarterCompleteKey = `three_quarter_completed_${today}`;
        const allCompleteKey = `all_completed_bonus_${today}`;
        
        // 如果之前给过奖励但现在不满足了，需要扣除奖励积分
        const completionRate = totalTasks > 0 ? completedCountAfterCancel / totalTasks : 0;
        
        // 先检查100%奖励
        if (completionRate < 1 && completionHistory[allCompleteKey]) {
            // 之前完成100%给了10分奖励，现在不满足100%了，扣除10分
            currentPoints = Math.max(0, currentPoints - 10);
            totalPointsEarned = Math.max(0, totalPointsEarned - 10);
            delete completionHistory[allCompleteKey];
            console.log('[每日完成度奖励] 取消100%奖励，扣除10积分');
            
            // 如果现在满足75%，给75%奖励（如果之前没给过）
            if (completionRate >= 0.75 && !completionHistory[threeQuarterCompleteKey]) {
                const bonusPoints = 5;
                currentPoints += bonusPoints;
                totalPointsEarned += bonusPoints;
                completionHistory[threeQuarterCompleteKey] = true;
                setTimeout(() => {
                    showCelebration('🎉 完成度奖励', bonusPoints, `完成75%任务，额外获得 ${bonusPoints} 积分！`);
                }, 500);
                console.log('[每日完成度奖励] 降到75%，奖励', bonusPoints, '积分');
            } else if (completionRate >= 0.5 && completionRate < 0.75 && !completionHistory[halfCompleteKey]) {
                // 如果现在满足50%，给50%奖励（如果之前没给过）
                const bonusPoints = 2;
                currentPoints += bonusPoints;
                totalPointsEarned += bonusPoints;
                completionHistory[halfCompleteKey] = true;
                setTimeout(() => {
                    showCelebration('🎉 完成度奖励', bonusPoints, `完成50%任务，额外获得 ${bonusPoints} 积分！`);
                }, 500);
                console.log('[每日完成度奖励] 降到50%，奖励', bonusPoints, '积分');
            }
        } else if (completionRate < 0.75 && completionHistory[threeQuarterCompleteKey]) {
            // 之前完成75%给了5分奖励，现在不满足75%了，扣除5分
            currentPoints = Math.max(0, currentPoints - 5);
            totalPointsEarned = Math.max(0, totalPointsEarned - 5);
            delete completionHistory[threeQuarterCompleteKey];
            console.log('[每日完成度奖励] 取消75%奖励，扣除5积分');
            
            // 如果现在满足50%，给50%奖励（如果之前没给过）
            if (completionRate >= 0.5 && !completionHistory[halfCompleteKey]) {
                const bonusPoints = 2;
                currentPoints += bonusPoints;
                totalPointsEarned += bonusPoints;
                completionHistory[halfCompleteKey] = true;
                setTimeout(() => {
                    showCelebration('🎉 完成度奖励', bonusPoints, `完成50%任务，额外获得 ${bonusPoints} 积分！`);
                }, 500);
                console.log('[每日完成度奖励] 降到50%，奖励', bonusPoints, '积分');
            }
        } else if (completionRate < 0.5 && completionHistory[halfCompleteKey]) {
            // 之前完成50%给了2分奖励，现在不满足50%了，扣除2分
            currentPoints = Math.max(0, currentPoints - 2);
            totalPointsEarned = Math.max(0, totalPointsEarned - 2);
            delete completionHistory[halfCompleteKey];
            console.log('[每日完成度奖励] 取消50%奖励，扣除2积分');
        }
        
        // 更新完成度奖励显示
        updateCompletionBonusDisplay(today);
    } else {
        // 完成任务
        task.completedToday = true;
        
        // 添加到完成记录
        if (!completionHistory[today]) {
            completionHistory[today] = [];
        }
        if (!completionHistory[today].includes(taskId)) {
            completionHistory[today].push(taskId);
        }
        
        // 给予积分
        currentPoints += task.points;
        totalPointsEarned += task.points;
        totalTasksCompleted++;
        lastCompletionDate = today;
        
        // 显示庆祝动画
        showCelebration(task.name, task.points);
        
        // 检查连续完成奖励（每周7天）
        const completedCount = completionHistory[today].length;
        const totalTasks = tasks.length;
        
        // 检查每日完成度奖励
        checkDailyCompletionBonus(today, completedCount, totalTasks);
        
        // 更新完成度奖励显示
        updateCompletionBonusDisplay(today);
        
        if (completedCount === tasks.length && tasks.length > 0) {
            // 今天所有任务都完成了
            showCelebration('🎊 完成所有任务！', 0, '太棒了！今天的所有任务都完成了！');
            
            // 检查今天是否第一次完成所有任务
            const todayCompletedKey = `all_completed_${today}`;
            if (!completionHistory[todayCompletedKey]) {
                allTasksCompletedDays++;
                completionHistory[todayCompletedKey] = true;
            }
            
            // 检查是否连续7天
            if (streakDays > 0 && streakDays % 7 === 0) {
                const bonusPoints = Math.floor(streakDays / 7) * 20;
                currentPoints += bonusPoints;
                totalPointsEarned += bonusPoints;
                setTimeout(() => {
                    showCelebration('连续完成奖励', bonusPoints, `连续完成${streakDays}天！`);
                }, 1500);
            }
        }
        
        // 检查成就
        checkAchievements();
    }
    
    saveData();
    renderTasks();
    updatePointsDisplay();
    updateStreakDisplay();
    updateTodayProgress();
    checkMilestones();
    renderAchievements();
    renderCalendar(); // 更新日历显示
    updateWeekProgress(); // 更新本周进度
}

// 添加任务
function addTask() {
    if (!hasSelectedUser()) {
        showNoUserWarning();
        return;
    }
    
    const newTask = {
        id: Date.now(),
        name: '新任务',
        points: 1,
        completedToday: false
    };
    tasks.push(newTask);
    saveData();
    renderTasks();
}

// 删除任务
function deleteTask(taskId) {
    if (!hasSelectedUser()) {
        showNoUserWarning();
        return;
    }
    
    tasks = tasks.filter(t => t.id !== taskId);
    saveData();
    renderTasks();
    updateTodayProgress();
}

// 更新今日进度
function updateTodayProgress() {
    const todayString = getTodayDateString();
    const currentViewDate = viewingDate || todayString;
    const isViewingToday = currentViewDate === todayString;
    
    // 获取当前查看日期的完成记录
    const completedTaskIds = completionHistory[currentViewDate] || [];
    const completedCount = completedTaskIds.length;
    const totalToday = tasks.length;
    
    const todayProgressEl = document.getElementById('todayProgress');
    if (todayProgressEl) {
        if (isViewingToday) {
            todayProgressEl.textContent = `${completedCount} / ${totalToday}`;
        } else {
            const date = new Date(currentViewDate);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            todayProgressEl.textContent = `${month}月${day}日: ${completedCount} / ${totalToday}`;
        }
    } else {
        console.warn('[更新今日进度] 警告: 找不到 todayProgress 元素');
        return;
    }
    
    const progressPercent = totalToday > 0 ? (completedCount / totalToday) * 100 : 0;
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        progressFill.style.width = `${progressPercent}%`;
        
        if (progressPercent === 100) {
            progressFill.style.background = 'linear-gradient(90deg, #28a745 0%, #20c997 100%)';
        } else {
            progressFill.style.background = 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)';
        }
    } else {
        console.warn('[更新今日进度] 警告: 找不到 progressFill 元素');
    }
    
    // 更新完成度奖励提示（只在查看今天时显示）
    updateCompletionBonusDisplay(isViewingToday ? currentViewDate : null);
}

// 更新完成度奖励显示
function updateCompletionBonusDisplay(dateString) {
    const halfBonusItem = document.getElementById('halfBonusItem');
    const threeQuarterBonusItem = document.getElementById('threeQuarterBonusItem');
    const fullBonusItem = document.getElementById('fullBonusItem');
    
    if (!halfBonusItem || !threeQuarterBonusItem || !fullBonusItem) {
        console.warn('[更新完成度奖励] 警告: 找不到奖励提示元素');
        return;
    }
    
    // 如果不是查看今天，隐藏所有奖励提示
    if (!dateString) {
        halfBonusItem.style.display = 'none';
        threeQuarterBonusItem.style.display = 'none';
        fullBonusItem.style.display = 'none';
        return;
    }
    
    const todayString = getTodayDateString();
    if (dateString !== todayString) {
        halfBonusItem.style.display = 'none';
        threeQuarterBonusItem.style.display = 'none';
        fullBonusItem.style.display = 'none';
        return;
    }
    
    const totalTasks = tasks.length;
    const completedCount = completionHistory[dateString] ? completionHistory[dateString].length : 0;
    const completionRate = totalTasks > 0 ? completedCount / totalTasks : 0;
    
    const halfCompleteKey = `half_completed_${dateString}`;
    const threeQuarterCompleteKey = `three_quarter_completed_${dateString}`;
    const allCompleteKey = `all_completed_bonus_${dateString}`;
    
    const hasHalfBonus = completionHistory[halfCompleteKey];
    const hasThreeQuarterBonus = completionHistory[threeQuarterCompleteKey];
    const hasFullBonus = completionHistory[allCompleteKey];
    
    // 显示/隐藏50%奖励提示（仅在未达到75%时显示）
    if (completionRate >= 0.5 && completionRate < 0.75) {
        halfBonusItem.style.display = 'flex';
        if (hasHalfBonus) {
            halfBonusItem.classList.add('earned');
            halfBonusItem.querySelector('.bonus-text').textContent = `✅ 完成50%任务，已获得额外奖励 +2 积分`;
        } else {
            halfBonusItem.classList.remove('earned');
            halfBonusItem.querySelector('.bonus-text').innerHTML = `完成50%任务，额外奖励 <span class="bonus-points">+2</span> 积分`;
        }
    } else {
        halfBonusItem.style.display = 'none';
    }
    
    // 显示/隐藏75%奖励提示（仅在未达到100%时显示）
    if (completionRate >= 0.75 && completionRate < 1) {
        threeQuarterBonusItem.style.display = 'flex';
        if (hasThreeQuarterBonus) {
            threeQuarterBonusItem.classList.add('earned');
            threeQuarterBonusItem.querySelector('.bonus-text').textContent = `✅ 完成75%任务，已获得额外奖励 +5 积分`;
        } else {
            threeQuarterBonusItem.classList.remove('earned');
            threeQuarterBonusItem.querySelector('.bonus-text').innerHTML = `完成75%任务，额外奖励 <span class="bonus-points">+5</span> 积分`;
        }
    } else {
        threeQuarterBonusItem.style.display = 'none';
    }
    
    // 显示/隐藏100%奖励提示
    if (completionRate === 1 && totalTasks > 0) {
        fullBonusItem.style.display = 'flex';
        if (hasFullBonus) {
            fullBonusItem.classList.add('earned');
            fullBonusItem.querySelector('.bonus-text').textContent = `✅ 完成所有任务，已获得额外奖励 +10 积分`;
        } else {
            fullBonusItem.classList.remove('earned');
            fullBonusItem.querySelector('.bonus-text').innerHTML = `完成所有任务，额外奖励 <span class="bonus-points">+10</span> 积分`;
        }
    } else {
        fullBonusItem.style.display = 'none';
    }
    
    // 如果已完成100%，隐藏50%和75%提示（因为100%包含它们）
    if (hasFullBonus) {
        halfBonusItem.style.display = 'none';
        threeQuarterBonusItem.style.display = 'none';
    } else if (hasThreeQuarterBonus) {
        // 如果已完成75%，隐藏50%提示
        halfBonusItem.style.display = 'none';
    }
}

// 显示庆祝动画
function showCelebration(taskName, points, customText = null) {
    const celebration = document.getElementById('celebration');
    if (!celebration) {
        console.warn('[庆祝动画] 警告: 找不到 celebration 元素');
        return;
    }
    
    const celebrationText = celebration.querySelector('.celebration-text');
    const celebrationPoints = celebration.querySelector('.celebration-points');
    
    if (celebrationText) {
        if (customText) {
            celebrationText.textContent = customText;
        } else {
            celebrationText.textContent = `完成任务：${taskName}`;
        }
    } else {
        console.warn('[庆祝动画] 警告: 找不到 celebration-text 元素');
    }
    
    if (celebrationPoints) {
        if (points > 0) {
            celebrationPoints.textContent = `+${points} 积分`;
        } else {
            celebrationPoints.textContent = '';
        }
    } else {
        console.warn('[庆祝动画] 警告: 找不到 celebration-points 元素');
    }
    
    celebration.classList.add('show');
    
    setTimeout(() => {
        celebration.classList.remove('show');
    }, 2000);
}

// 鼓励消息
const encouragementMessages = [
    '太棒了！继续加油！',
    '你真了不起！',
    '做得好！',
    '继续保持！',
    '太厉害了！',
    '你是个小超人！',
    '真不错！',
    '干得漂亮！',
    '太出色了！',
    '你真的很棒！'
];

// 获取打开天数
function getOpenDays() {
    if (!currentUserId) return 0;
    const currentUser = users.find(u => u.id === currentUserId);
    if (!currentUser || !currentUser.openHistory) return 0;
    return Object.keys(currentUser.openHistory).filter(date => currentUser.openHistory[date]).length;
}

// 检查成就
function checkAchievements() {
    const openDays = getOpenDays();
    
    const achievements = [
        // 任务完成数量相关 (12个)
        { id: 'first_task', name: '🌱 初出茅庐', desc: '完成第一个任务', condition: () => totalTasksCompleted >= 1 },
        { id: 'five_tasks', name: '⭐ 起步者', desc: '累计完成5个任务', condition: () => totalTasksCompleted >= 5 },
        { id: 'ten_tasks', name: '⭐ 小有成就', desc: '累计完成10个任务', condition: () => totalTasksCompleted >= 10 },
        { id: 'twenty_five_tasks', name: '🌟 任务新手', desc: '累计完成25个任务', condition: () => totalTasksCompleted >= 25 },
        { id: 'fifty_tasks', name: '🌟 任务达人', desc: '累计完成50个任务', condition: () => totalTasksCompleted >= 50 },
        { id: 'seventy_five_tasks', name: '💫 任务高手', desc: '累计完成75个任务', condition: () => totalTasksCompleted >= 75 },
        { id: 'hundred_tasks', name: '🏆 任务大师', desc: '累计完成100个任务', condition: () => totalTasksCompleted >= 100 },
        { id: 'hundred_fifty_tasks', name: '🏆 任务精英', desc: '累计完成150个任务', condition: () => totalTasksCompleted >= 150 },
        { id: 'two_hundred_tasks', name: '👑 任务王者', desc: '累计完成200个任务', condition: () => totalTasksCompleted >= 200 },
        { id: 'three_hundred_tasks', name: '👑 任务传奇', desc: '累计完成300个任务', condition: () => totalTasksCompleted >= 300 },
        { id: 'five_hundred_tasks', name: '🌟 任务神话', desc: '累计完成500个任务', condition: () => totalTasksCompleted >= 500 },
        { id: 'thousand_tasks', name: '✨ 任务传说', desc: '累计完成1000个任务', condition: () => totalTasksCompleted >= 1000 },
        
        // 连续天数相关 (10个)
        { id: 'three_streak', name: '🌿 三日坚持', desc: '连续完成3天', condition: () => streakDays >= 3 },
        { id: 'seven_streak', name: '🔥 一周坚持', desc: '连续完成7天', condition: () => streakDays >= 7 },
        { id: 'fourteen_streak', name: '💪 双周坚持', desc: '连续完成14天', condition: () => streakDays >= 14 },
        { id: 'twenty_one_streak', name: '💪 三周坚持', desc: '连续完成21天', condition: () => streakDays >= 21 },
        { id: 'month_streak', name: '💪 月度坚持', desc: '连续完成30天', condition: () => streakDays >= 30 },
        { id: 'sixty_streak', name: '🔥 双月坚持', desc: '连续完成60天', condition: () => streakDays >= 60 },
        { id: 'ninety_streak', name: '🌟 季度坚持', desc: '连续完成90天', condition: () => streakDays >= 90 },
        { id: 'hundred_streak', name: '👑 百日坚持', desc: '连续完成100天', condition: () => streakDays >= 100 },
        { id: 'two_hundred_streak', name: '👑 两百日坚持', desc: '连续完成200天', condition: () => streakDays >= 200 },
        { id: 'year_streak', name: '✨ 年度坚持', desc: '连续完成365天', condition: () => streakDays >= 365 },
        
        // 积分获得相关 (8个)
        { id: 'fifty_points', name: '💰 小有积蓄', desc: '累计获得50积分', condition: () => totalPointsEarned >= 50 },
        { id: 'hundred_points', name: '💰 积分达人', desc: '累计获得100积分', condition: () => totalPointsEarned >= 100 },
        { id: 'two_hundred_points', name: '💎 积分富翁', desc: '累计获得200积分', condition: () => totalPointsEarned >= 200 },
        { id: 'three_hundred_points', name: '💎 积分大亨', desc: '累计获得300积分', condition: () => totalPointsEarned >= 300 },
        { id: 'five_hundred_points', name: '💎 积分富翁', desc: '累计获得500积分', condition: () => totalPointsEarned >= 500 },
        { id: 'thousand_points', name: '🏆 积分王者', desc: '累计获得1000积分', condition: () => totalPointsEarned >= 1000 },
        { id: 'two_thousand_points', name: '👑 积分传奇', desc: '累计获得2000积分', condition: () => totalPointsEarned >= 2000 },
        { id: 'five_thousand_points', name: '✨ 积分神话', desc: '累计获得5000积分', condition: () => totalPointsEarned >= 5000 },
        
        // 当前积分相关 (3个)
        { id: 'current_two_hundred', name: '💵 财富积累', desc: '当前积分达到200', condition: () => currentPoints >= 200 },
        { id: 'current_five_hundred', name: '💵 财富充裕', desc: '当前积分达到500', condition: () => currentPoints >= 500 },
        { id: 'current_thousand', name: '💵 财富自由', desc: '当前积分达到1000', condition: () => currentPoints >= 1000 },
        
        // 单日完成所有任务 (6个)
        { id: 'perfect_day_one', name: '🎯 完美一日', desc: '单日完成所有任务1次', condition: () => allTasksCompletedDays >= 1 },
        { id: 'perfect_day_five', name: '🎯 完美周', desc: '单日完成所有任务5次', condition: () => allTasksCompletedDays >= 5 },
        { id: 'perfect_day_ten', name: '🎯 完美双周', desc: '单日完成所有任务10次', condition: () => allTasksCompletedDays >= 10 },
        { id: 'perfect_day_twenty', name: '🏆 完美月度', desc: '单日完成所有任务20次', condition: () => allTasksCompletedDays >= 20 },
        { id: 'perfect_day_thirty', name: '🏆 完美季度', desc: '单日完成所有任务30次', condition: () => allTasksCompletedDays >= 30 },
        { id: 'perfect_day_fifty', name: '👑 完美传说', desc: '单日完成所有任务50次', condition: () => allTasksCompletedDays >= 50 },
        
        // 打开天数 (6个)
        { id: 'open_seven', name: '📅 一周使用', desc: '累计打开7天', condition: () => openDays >= 7 },
        { id: 'open_thirty', name: '📅 月度使用', desc: '累计打开30天', condition: () => openDays >= 30 },
        { id: 'open_sixty', name: '📅 双月使用', desc: '累计打开60天', condition: () => openDays >= 60 },
        { id: 'open_ninety', name: '📅 季度使用', desc: '累计打开90天', condition: () => openDays >= 90 },
        { id: 'open_hundred', name: '📅 百日使用', desc: '累计打开100天', condition: () => openDays >= 100 },
        { id: 'open_two_hundred', name: '📅 两百日使用', desc: '累计打开200天', condition: () => openDays >= 200 },
        
        // 抽奖次数 (5个)
        { id: 'first_spin', name: '🎰 初次抽奖', desc: '完成第一次抽奖', condition: () => totalSpins >= 1 },
        { id: 'spin_five', name: '🎰 抽奖新手', desc: '累计抽奖5次', condition: () => totalSpins >= 5 },
        { id: 'spin_ten', name: '🎰 抽奖达人', desc: '累计抽奖10次', condition: () => totalSpins >= 10 },
        { id: 'spin_twenty', name: '🎰 抽奖大师', desc: '累计抽奖20次', condition: () => totalSpins >= 20 },
        { id: 'spin_fifty', name: '🎰 抽奖传奇', desc: '累计抽奖50次', condition: () => totalSpins >= 50 }
    ];
    
    achievements.forEach(achievement => {
        if (!unlockedAchievements.includes(achievement.id) && achievement.condition()) {
            unlockedAchievements.push(achievement.id);
            setTimeout(() => {
                showCelebration(achievement.name, 0, `🎉 获得成就：${achievement.desc}`);
            }, 500);
            renderAchievements();
            saveData();
        }
    });
}

// 渲染成就
function renderAchievements() {
    const achievementsList = document.getElementById('achievementsList');
    if (!achievementsList) {
        console.warn('[渲染成就] 警告: 找不到 achievementsList 元素');
        return;
    }
    achievementsList.innerHTML = '';
    
    const allAchievements = [
        // 任务完成数量相关 (12个)
        { id: 'first_task', name: '🌱 初出茅庐', desc: '完成第一个任务' },
        { id: 'five_tasks', name: '⭐ 起步者', desc: '累计完成5个任务' },
        { id: 'ten_tasks', name: '⭐ 小有成就', desc: '累计完成10个任务' },
        { id: 'twenty_five_tasks', name: '🌟 任务新手', desc: '累计完成25个任务' },
        { id: 'fifty_tasks', name: '🌟 任务达人', desc: '累计完成50个任务' },
        { id: 'seventy_five_tasks', name: '💫 任务高手', desc: '累计完成75个任务' },
        { id: 'hundred_tasks', name: '🏆 任务大师', desc: '累计完成100个任务' },
        { id: 'hundred_fifty_tasks', name: '🏆 任务精英', desc: '累计完成150个任务' },
        { id: 'two_hundred_tasks', name: '👑 任务王者', desc: '累计完成200个任务' },
        { id: 'three_hundred_tasks', name: '👑 任务传奇', desc: '累计完成300个任务' },
        { id: 'five_hundred_tasks', name: '🌟 任务神话', desc: '累计完成500个任务' },
        { id: 'thousand_tasks', name: '✨ 任务传说', desc: '累计完成1000个任务' },
        
        // 连续天数相关 (10个)
        { id: 'three_streak', name: '🌿 三日坚持', desc: '连续完成3天' },
        { id: 'seven_streak', name: '🔥 一周坚持', desc: '连续完成7天' },
        { id: 'fourteen_streak', name: '💪 双周坚持', desc: '连续完成14天' },
        { id: 'twenty_one_streak', name: '💪 三周坚持', desc: '连续完成21天' },
        { id: 'month_streak', name: '💪 月度坚持', desc: '连续完成30天' },
        { id: 'sixty_streak', name: '🔥 双月坚持', desc: '连续完成60天' },
        { id: 'ninety_streak', name: '🌟 季度坚持', desc: '连续完成90天' },
        { id: 'hundred_streak', name: '👑 百日坚持', desc: '连续完成100天' },
        { id: 'two_hundred_streak', name: '👑 两百日坚持', desc: '连续完成200天' },
        { id: 'year_streak', name: '✨ 年度坚持', desc: '连续完成365天' },
        
        // 积分获得相关 (8个)
        { id: 'fifty_points', name: '💰 小有积蓄', desc: '累计获得50积分' },
        { id: 'hundred_points', name: '💰 积分达人', desc: '累计获得100积分' },
        { id: 'two_hundred_points', name: '💎 积分富翁', desc: '累计获得200积分' },
        { id: 'three_hundred_points', name: '💎 积分大亨', desc: '累计获得300积分' },
        { id: 'five_hundred_points', name: '💎 积分富翁', desc: '累计获得500积分' },
        { id: 'thousand_points', name: '🏆 积分王者', desc: '累计获得1000积分' },
        { id: 'two_thousand_points', name: '👑 积分传奇', desc: '累计获得2000积分' },
        { id: 'five_thousand_points', name: '✨ 积分神话', desc: '累计获得5000积分' },
        
        // 当前积分相关 (3个)
        { id: 'current_two_hundred', name: '💵 财富积累', desc: '当前积分达到200' },
        { id: 'current_five_hundred', name: '💵 财富充裕', desc: '当前积分达到500' },
        { id: 'current_thousand', name: '💵 财富自由', desc: '当前积分达到1000' },
        
        // 单日完成所有任务 (6个)
        { id: 'perfect_day_one', name: '🎯 完美一日', desc: '单日完成所有任务1次' },
        { id: 'perfect_day_five', name: '🎯 完美周', desc: '单日完成所有任务5次' },
        { id: 'perfect_day_ten', name: '🎯 完美双周', desc: '单日完成所有任务10次' },
        { id: 'perfect_day_twenty', name: '🏆 完美月度', desc: '单日完成所有任务20次' },
        { id: 'perfect_day_thirty', name: '🏆 完美季度', desc: '单日完成所有任务30次' },
        { id: 'perfect_day_fifty', name: '👑 完美传说', desc: '单日完成所有任务50次' },
        
        // 打开天数 (6个)
        { id: 'open_seven', name: '📅 一周使用', desc: '累计打开7天' },
        { id: 'open_thirty', name: '📅 月度使用', desc: '累计打开30天' },
        { id: 'open_sixty', name: '📅 双月使用', desc: '累计打开60天' },
        { id: 'open_ninety', name: '📅 季度使用', desc: '累计打开90天' },
        { id: 'open_hundred', name: '📅 百日使用', desc: '累计打开100天' },
        { id: 'open_two_hundred', name: '📅 两百日使用', desc: '累计打开200天' },
        
        // 抽奖次数 (5个)
        { id: 'first_spin', name: '🎰 初次抽奖', desc: '完成第一次抽奖' },
        { id: 'spin_five', name: '🎰 抽奖新手', desc: '累计抽奖5次' },
        { id: 'spin_ten', name: '🎰 抽奖达人', desc: '累计抽奖10次' },
        { id: 'spin_twenty', name: '🎰 抽奖大师', desc: '累计抽奖20次' },
        { id: 'spin_fifty', name: '🎰 抽奖传奇', desc: '累计抽奖50次' }
    ];
    
    allAchievements.forEach(achievement => {
        const badge = document.createElement('div');
        const isUnlocked = unlockedAchievements.includes(achievement.id);
        badge.className = `achievement-badge ${isUnlocked ? 'unlocked' : 'locked'}`;
        badge.title = achievement.desc;
        badge.innerHTML = `
            <span>${achievement.name}</span>
        `;
        achievementsList.appendChild(badge);
    });
}

// 检查积分里程碑
function checkMilestones() {
    const milestones = [50, 100, 200, 300, 500, 1000];
    const currentMilestone = milestones.find(m => totalPointsEarned >= m && totalPointsEarned < m + 10);
    
    if (currentMilestone && totalPointsEarned === currentMilestone) {
        setTimeout(() => {
            showCelebration('积分里程碑', 0, `🎊 累计积分达到 ${currentMilestone} 分！`);
        }, 500);
    }
}

// 显示统计对话框
function showStatsModal() {
    if (!hasSelectedUser()) {
        showNoUserWarning();
        return;
    }
    
    const totalTasksEl = document.getElementById('totalTasksCompleted');
    const totalPointsEl = document.getElementById('totalPointsEarned');
    const maxStreakEl = document.getElementById('maxStreakDays');
    const currentLevelEl = document.getElementById('currentLevel');
    const openDaysEl = document.getElementById('openDays');
    
    if (totalTasksEl) {
        totalTasksEl.textContent = totalTasksCompleted;
    } else {
        console.warn('[显示统计] 警告: 找不到 totalTasksCompleted 元素');
    }
    
    if (totalPointsEl) {
        totalPointsEl.textContent = totalPointsEarned;
    } else {
        console.warn('[显示统计] 警告: 找不到 totalPointsEarned 元素');
    }
    
    if (maxStreakEl) {
        maxStreakEl.textContent = maxStreakDays;
    } else {
        console.warn('[显示统计] 警告: 找不到 maxStreakDays 元素');
    }
    
    // 计算等级
    let level = '新手';
    if (totalPointsEarned >= 1000) level = '传奇';
    else if (totalPointsEarned >= 500) level = '大师';
    else if (totalPointsEarned >= 200) level = '精英';
    else if (totalPointsEarned >= 100) level = '进阶';
    else if (totalPointsEarned >= 50) level = '入门';
    
    if (currentLevelEl) {
        currentLevelEl.textContent = level;
    } else {
        console.warn('[显示统计] 警告: 找不到 currentLevel 元素');
    }
    
    // 计算打开记录天数
    if (currentUserId) {
        const currentUser = users.find(u => u.id === currentUserId);
        if (currentUser && currentUser.openHistory) {
            const openDays = Object.keys(currentUser.openHistory).filter(date => currentUser.openHistory[date]).length;
            if (openDaysEl) {
                openDaysEl.textContent = openDays;
            }
        } else {
            if (openDaysEl) {
                openDaysEl.textContent = '0';
            }
        }
    } else {
        if (openDaysEl) {
            openDaysEl.textContent = '0';
        }
    }
    
    // 显示累计抽奖次数
    const totalSpinsEl = document.getElementById('totalSpins');
    if (totalSpinsEl) {
        totalSpinsEl.textContent = totalSpins;
    }
    
    // 渲染抽奖历史记录
    renderLotteryHistory();
    
    const statsModal = document.getElementById('statsModal');
    if (statsModal) {
        statsModal.classList.add('show');
    } else {
        console.error('[显示统计] 错误: 找不到 statsModal 元素');
    }
}

// 渲染抽奖历史记录
function renderLotteryHistory() {
    const historyContainer = document.getElementById('lotteryHistoryContainer');
    if (!historyContainer) {
        console.warn('[抽奖历史] 警告: 找不到 lotteryHistoryContainer 元素');
        return;
    }
    
    // 按时间戳倒序排列（最新的在前）
    const sortedHistory = [...prizeHistory].sort((a, b) => {
        // 如果有timestamp，按timestamp排序；否则按date排序
        if (a.timestamp && b.timestamp) {
            return b.timestamp - a.timestamp;
        }
        // 降级处理：按date字符串排序（YYYY-MM-DD格式）
        return (b.date || '').localeCompare(a.date || '');
    });
    
    if (sortedHistory.length === 0) {
        historyContainer.innerHTML = '<div class="no-history">暂无抽奖记录</div>';
        return;
    }
    
    // 按日期分组
    const historyByDate = {};
    sortedHistory.forEach(record => {
        const date = record.date || '未知日期';
        if (!historyByDate[date]) {
            historyByDate[date] = [];
        }
        historyByDate[date].push(record);
    });
    
    // 生成HTML
    let html = '';
    const sortedDates = Object.keys(historyByDate).sort((a, b) => b.localeCompare(a)); // 降序排列
    
    sortedDates.forEach(date => {
        const records = historyByDate[date];
        html += `<div class="history-date-group">`;
        html += `<div class="history-date-header">📅 ${date} (${records.length} 次)</div>`;
        
        records.forEach((record, index) => {
            let timeStr = '';
            if (record.timestamp) {
                try {
                    timeStr = new Date(record.timestamp).toLocaleTimeString('zh-CN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                    });
                } catch (e) {
                    console.warn('[抽奖历史] 时间戳格式错误:', record.timestamp);
                }
            }
            const cost = record.cost || 0;
            const prizeName = record.prizeName || '未知奖品';
            html += `<div class="history-item">`;
            html += `<span class="history-time">${timeStr || '--:--'}</span>`;
            html += `<span class="history-prize">${prizeName}</span>`;
            html += `<span class="history-cost">消耗 ${cost} 积分</span>`;
            html += `</div>`;
        });
        
        html += `</div>`;
    });
    
    historyContainer.innerHTML = html;
}

// 隐藏统计对话框
function hideStatsModal() {
    document.getElementById('statsModal').classList.remove('show');
}

// ============ 用户管理系统 ============

// 记录今日打开
function recordTodayOpen() {
    if (currentUserId) {
        const currentUser = users.find(u => u.id === currentUserId);
        if (currentUser) {
            const today = getTodayDateString();
            if (!currentUser.openHistory) {
                currentUser.openHistory = {};
            }
            currentUser.openHistory[today] = true;
            saveData();
        }
    }
}

// 显示用户管理对话框
function showUserManageModal() {
    renderUserList();
    document.getElementById('userManageModal').classList.add('show');
}

// 隐藏用户管理对话框
function hideUserManageModal() {
    document.getElementById('userManageModal').classList.remove('show');
}

// 渲染用户列表
function renderUserList() {
    const userList = document.getElementById('userList');
    if (!userList) {
        console.warn('[用户管理] 警告: 找不到 userList 元素');
        return;
    }
    
    userList.innerHTML = '';
    
    if (users.length === 0) {
        userList.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">还没有用户，请添加第一个用户</p>';
        return;
    }
    
    users.forEach((user) => {
        const userItem = document.createElement('div');
        userItem.className = `user-item ${user.id === currentUserId ? 'active' : ''}`;
        userItem.innerHTML = `
            <div class="user-info">
                <div class="user-name-gender">
                    <span class="user-name">${user.name}</span>
                    <span class="user-gender">${user.gender === '男' ? '♂' : '♀'}</span>
                </div>
                <div class="user-stats">
                    <span>积分: ${user.currentPoints || 0}</span>
                    <span>成就: ${(user.unlockedAchievements || []).length}</span>
                    <span>连续: ${user.streakDays || 0}天</span>
                </div>
            </div>
            <div class="user-actions">
                <button class="edit-user-btn" 
                        data-userid="${user.id}" 
                        title="编辑用户信息">✏️ 编辑</button>
                <button class="select-user-btn ${user.id === currentUserId ? 'active' : ''}" 
                        data-userid="${user.id}" 
                        title="切换到此用户">
                    ${user.id === currentUserId ? '✓ 当前' : '切换'}
                </button>
                <button class="delete-user-btn" 
                        data-userid="${user.id}" 
                        ${users.length <= 1 ? 'disabled' : ''}
                        title="删除用户">🗑️</button>
            </div>
        `;
        
        userList.appendChild(userItem);
    });
    
    // 绑定事件
    document.querySelectorAll('.edit-user-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const userId = e.target.dataset.userid;
            showEditUserModal(userId);
        });
    });
    
    document.querySelectorAll('.select-user-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const userId = e.target.dataset.userid;
            switchUser(userId);
            hideUserManageModal();
        });
    });
    
    document.querySelectorAll('.delete-user-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const userId = e.target.dataset.userid;
            if (users.length > 1) {
                if (confirm(`确定要删除用户"${users.find(u => u.id === userId)?.name}"吗？此操作不可恢复！`)) {
                    deleteUser(userId);
                }
            }
        });
    });
}

// 添加新用户
function addNewUser() {
    const nameInput = document.getElementById('newUserName');
    const genderSelect = document.getElementById('newUserGender');
    
    const name = nameInput.value.trim();
    const gender = genderSelect.value;
    
    if (!name) {
        alert('请输入用户姓名');
        nameInput.focus();
        return;
    }
    
    // 检查姓名是否重复
    if (users.some(u => u.name === name)) {
        alert('该姓名已存在，请使用其他姓名');
        nameInput.focus();
        return;
    }
    
    const newUser = {
        id: Date.now().toString(),
        name: name,
        gender: gender,
        tasks: getDefaultTasks(),
        currentPoints: 0,
        spinCost: 100,
        completionHistory: {},
        lastCompletionDate: null,
        streakDays: 0,
        totalTasksCompleted: 0,
        totalPointsEarned: 0,
        maxStreakDays: 0,
        unlockedAchievements: [],
        totalSpins: 0,
        allTasksCompletedDays: 0,
        weeklyPerfectDays: 0,
        prizeHistory: [],
        openHistory: {}
    };
    
    users.push(newUser);
    saveData();
    
    // 清空输入框
    nameInput.value = '';
    
    // 切换到新用户
    switchUser(newUser.id);
    
    // 重新渲染
    renderUserList();
    
    console.log('[用户管理] 添加新用户:', newUser.name);
}

// 切换用户
function switchUser(userId) {
    // 先保存当前用户数据
    saveData();
    
    // 切换到新用户
    currentUserId = userId;
    const user = users.find(u => u.id === userId);
    
    if (user) {
        loadUserData(user);
        
        // 更新界面
        updateCurrentUserDisplay();
        renderTasks();
        renderPrizes();
        updatePointsDisplay();
        updateStreakDisplay();
        updateTodayProgress();
        renderAchievements();
        drawWheel();
        renderCalendar(); // 重新渲染日历
        viewingDate = null; // 切换用户后重置查看日期为今天
        updateViewingDateIndicator();
        updateWeekProgress(); // 更新本周进度
        updateUIForUserSelection(); // 更新UI状态
        
        console.log('[用户管理] 切换到用户:', user.name);
    }
}

// 显示编辑用户对话框
let editingUserId = null;

function showEditUserModal(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) {
        console.warn('[编辑用户] 警告: 找不到用户', userId);
        return;
    }
    
    editingUserId = userId;
    const nameInput = document.getElementById('editUserName');
    const genderSelect = document.getElementById('editUserGender');
    
    if (nameInput) {
        nameInput.value = user.name;
    }
    
    if (genderSelect) {
        genderSelect.value = user.gender || '女';
    }
    
    const editModal = document.getElementById('editUserModal');
    if (editModal) {
        editModal.classList.add('show');
        // 聚焦到输入框并选中文本
        setTimeout(() => {
            if (nameInput) {
                nameInput.focus();
                nameInput.select();
            }
        }, 100);
    } else {
        console.error('[编辑用户] 错误: 找不到 editUserModal 元素');
    }
}

// 隐藏编辑用户对话框
function hideEditUserModal() {
    const editModal = document.getElementById('editUserModal');
    if (editModal) {
        editModal.classList.remove('show');
    }
    editingUserId = null;
}

// 确认编辑用户
function confirmEditUser() {
    if (!editingUserId) {
        console.warn('[编辑用户] 警告: 没有正在编辑的用户');
        return;
    }
    
    const nameInput = document.getElementById('editUserName');
    const genderSelect = document.getElementById('editUserGender');
    
    if (!nameInput || !genderSelect) {
        console.error('[编辑用户] 错误: 找不到输入元素');
        return;
    }
    
    const name = nameInput.value.trim();
    const gender = genderSelect.value;
    
    if (!name) {
        alert('请输入用户姓名');
        nameInput.focus();
        return;
    }
    
    // 检查姓名是否与其他用户重复（排除当前编辑的用户）
    const existingUser = users.find(u => u.name === name && u.id !== editingUserId);
    if (existingUser) {
        alert('该姓名已存在，请使用其他姓名');
        nameInput.focus();
        return;
    }
    
    // 更新用户信息
    const user = users.find(u => u.id === editingUserId);
    if (user) {
        user.name = name;
        user.gender = gender;
        
        // 如果编辑的是当前用户，更新显示
        if (editingUserId === currentUserId) {
            updateCurrentUserDisplay();
        }
        
        // 保存数据
        saveData();
        
        // 重新渲染用户列表
        renderUserList();
        
        // 关闭编辑对话框
        hideEditUserModal();
        
        console.log('[编辑用户] 已更新用户信息:', name);
    } else {
        console.error('[编辑用户] 错误: 找不到要编辑的用户');
    }
}

// 删除用户
function deleteUser(userId) {
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) return;
    
    // 如果删除的是当前用户，切换到其他用户
    if (userId === currentUserId) {
        if (users.length > 1) {
            // 切换到第一个不是被删除用户的用户
            const otherUser = users.find(u => u.id !== userId);
            if (otherUser) {
                switchUser(otherUser.id);
            }
        } else {
            currentUserId = null;
            initDefaultData();
        }
    }
    
    // 删除用户
    users.splice(userIndex, 1);
    saveData();
    
    // 重新渲染
    renderUserList();
    updateCurrentUserDisplay();
    
    console.log('[用户管理] 删除用户:', userId);
}

// 更新当前用户显示
function updateCurrentUserDisplay() {
    const currentUserNameEl = document.getElementById('currentUserName');
    if (currentUserNameEl) {
        if (currentUserId) {
            const currentUser = users.find(u => u.id === currentUserId);
            if (currentUser) {
                currentUserNameEl.textContent = `${currentUser.name} ${currentUser.gender === '男' ? '♂' : '♀'}`;
            } else {
                currentUserNameEl.textContent = '未选择';
            }
        } else {
            currentUserNameEl.textContent = '未选择';
        }
    }
}

// 显示清除数据确认对话框
function showClearDataModal() {
    document.getElementById('clearDataModal').classList.add('show');
}

// 隐藏清除数据确认对话框
function hideClearDataModal() {
    document.getElementById('clearDataModal').classList.remove('show');
}

// 确认清除所有数据
function confirmClearData() {
    // 先隐藏对话框
    hideClearDataModal();
    
    // 清除所有 localStorage 数据
    localStorage.clear();
    
    // 重置所有变量
    users = [];
    currentUserId = null;
    tasks = getDefaultTasks();
    
    currentPoints = 0; // 重置为默认积分
    spinCost = 100; // 重置为默认抽奖消耗
    completionHistory = {};
    lastCompletionDate = null;
    streakDays = 0;
    totalTasksCompleted = 0;
    totalPointsEarned = 0;
    maxStreakDays = 0;
    unlockedAchievements = [];
    totalSpins = 0;
    allTasksCompletedDays = 0;
    weeklyPerfectDays = 0;
    isSpinning = false; // 重置抽奖状态
    
    // 重置转盘旋转状态
    if (canvas) {
        canvas.style.transform = 'rotate(0deg)';
    }
    
    // 重置抽奖结果显示
    const resultDisplay = document.getElementById('result');
    if (resultDisplay) {
        resultDisplay.classList.remove('show');
        resultDisplay.textContent = '';
    } else {
        console.warn('[清除数据] 警告: 找不到 result 元素');
    }
    
    // 保存重置后的数据
    saveData();
    
    // 更新用户显示
    updateCurrentUserDisplay();
    renderUserList();
    
    // 重新渲染所有界面
    renderTasks();
    renderPrizes();
    updatePointsDisplay(); // 这个函数会更新按钮状态和文本
    
    // 重置抽奖按钮状态（确保在 updatePointsDisplay 之后）
    const spinBtn = document.getElementById('spinBtn');
    if (spinBtn) {
        spinBtn.disabled = false;
        // 确保按钮文本也正确更新
        if (currentPoints >= spinCost) {
            spinBtn.innerHTML = `开始抽奖 (<span>${spinCost}</span> 积分)`;
        } else {
            spinBtn.innerHTML = `积分不足 (需要 <span>${spinCost}</span> 积分)`;
        }
    }
    updateStreakDisplay();
    updateTodayProgress();
    renderAchievements();
    drawWheel();
    
    // 显示成功提示（延迟一下确保对话框已经关闭）
    setTimeout(() => {
        alert('✅ 数据已清除！系统已重置为初始状态。');
    }, 100);
}

