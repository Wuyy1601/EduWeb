// 🟠 1. Gửi tài liệu (Upload tài liệu)
client.subscribe("notify-Upload", async ({ task, taskService }) => {
    const current = task.variables.get('totalPoint') || 0;
    const updated = current + 10;
    console.log(`📤 [Upload] - Cộng 10 điểm, tổng mới: ${updated}`);
    await taskService.complete(task, {
        variables: {
            totalPoint: { value: updated, type: "Integer" }
        }
    });
});

// 🟡 2. Làm bài kiểm tra / Đăng nhập
client.subscribe("notify-Test", async ({ task, taskService }) => {
    const current = task.variables.get('totalPoint') || 0;
    const updated = current + 20;
    console.log(`📝 [Test/Login] - Cộng 20 điểm, tổng mới: ${updated}`);
    await taskService.complete(task, {
        variables: {
            totalPoint: { value: updated, type: "Integer" }
        }
    });
});

// 🟢 3. Nhập mã giới thiệu
client.subscribe("notify-Referral", async ({ task, taskService }) => {
    const current = task.variables.get('totalPoint') || 0;
    const updated = current + 10;
    console.log(`👥 [Referral] - Cộng 10 điểm, tổng mới: ${updated}`);
    await taskService.complete(task, {
        variables: {
            totalPoint: { value: updated, type: "Integer" }
        }
    });
});

// 🔵 4. Cập nhật tổng điểm (bỏ qua bước này nếu không cần cộng dồn nữa)
client.subscribe("update-total-point", async ({ task, taskService }) => {
    const current = task.variables.get('totalPoint') || 0;
    const updated = current + 10;

    console.log(`➕ [Cập nhật điểm] ${current} + 10 = ${updated}`);
    console.log('DEBUG: Variables:', task.variables.getAll());
    await taskService.complete(task, {
        variables: {
            totalPoint: { value: updated, type: "Integer" }
        }
    });
}); 