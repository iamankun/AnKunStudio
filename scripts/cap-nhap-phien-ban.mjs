import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Bảng màu Terminal chuyên nghiệp ---
const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    cyan: "\x1b[36m",
    yellow: "\x1b[33m",
    green: "\x1b[32m",
    magenta: "\x1b[35m",
    red: "\x1b[31m"
};

// --- Khối Logo An Kun Studio sắc nét ---
const logoAnKun = `
 █████╗ ███╗   ██╗    ██╗  ██╗██╗   ██╗███╗   ██╗
██╔══██╗████╗  ██║    ██║ ██╔╝██║   ██║████╗  ██║
███████║██╔██╗ ██║    █████╔╝ ██║   ██║██╔██╗ ██║
██╔══██║██║╚██╗██║    ██╔═██╗ ██║   ██║██║╚██╗██║
██║  ██║██║ ╚████║    ██║  ██╗╚██████╔╝██║ ╚████║
╚═╝  ╚═╝╚═╝  ╚═══╝    ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
            |____S T U D I O  b y  A N K U N  S T U D I O,  L L C
`;

// --- Spinner animation ---
const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
let spinnerInterval;

function startSpinner(message) {
    let i = 0;
    spinnerInterval = setInterval(() => {
        process.stdout.write(`\r${colors.cyan}${frames[i]}${colors.reset} ${message}`);
        i = (i + 1) % frames.length;
    }, 80);
}

function stopSpinner() {
    if (spinnerInterval) {
        clearInterval(spinnerInterval);
        process.stdout.write('\r' + ' '.repeat(process.stdout.columns) + '\r');
    }
}

async function initAnKunStudio() {
    // 1. Hiển thị thông điệp chào mừng
    console.log(`${colors.cyan}${colors.bright}${logoAnKun}${colors.reset}`);
    console.log(`${colors.yellow}🚀 Đang khởi động tiến trình hệ thống cho An Kun Studio...${colors.reset}\n`);

    try {
        // --- Build Process Steps ---
        const buildSteps = [
            "Đang kiểm tra môi trường...",
            "Đang tải các thành phần...",
            "Đang tối ưu hóa tài nguyên...",
            "Đang biên dịch ứng dụng...",
            "Đang tạo bản build cuối cùng..."
        ];

        for (let i = 0; i < buildSteps.length; i++) {
            startSpinner(buildSteps[i]);
            // Giả lập thời gian xử lý cho mỗi bước
            await new Promise(resolve => setTimeout(resolve, 1000));
            stopSpinner();
            console.log(`${colors.green}✅${colors.reset} ${buildSteps[i]}`);
        }

        // Final step
        startSpinner("Đang hoàn tất cài đặt...");
        await new Promise(resolve => setTimeout(resolve, 1500));
        stopSpinner();

        // 2. Thông báo thành công
        console.log(`\n${colors.green}---------------------------------------------------`);
        console.log(`✅  Hệ thống An Kun Studio đã sẵn sàng biên dịch!`);
        console.log(`👉  Chào mừng An Kun đến với An Kun Studio Digital Music Distribution`);
        console.log(`---------------------------------------------------${colors.reset}\n`);
        
    } catch (error) {
        stopSpinner();
        // 3. Bắt lỗi an toàn và dừng luồng
        console.error(`${colors.red}❌ Lỗi tiến trình: ${error.message}${colors.reset}`);
        process.exit(1);
    }
}

// Kích hoạt tiến trình
initAnKunStudio();