"use client";

export default function Home() {
  const showNotification = async () => {
    // 브라우저 환경에서만 실행
    if (typeof window === "undefined") return;

    const date = new Date().toLocaleString();

    // Notification API 지원 여부 확인
    if (!("Notification" in window)) {
      alert("이 브라우저는 알림을 지원하지 않습니다.");
      return;
    }

    const notificationPermission = Notification.permission;

    if (notificationPermission === "granted") {
      // 이미 허용된 경우 알림 표시
      new Notification("건조기가 완료되었습니다!", {
        body: `315호 3F/L3`,
        icon: "/washer_icon.png", // 기존 아이콘 사용
      });
    } else if (notificationPermission !== "denied") {
      // 권한 요청 (최신 Promise 방식 사용)
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          new Notification("건조기가 완료되었습니다!", {
            body: `첫방문일시: ${date}`,
            icon: "/next.svg",
          });
        } else {
          alert("알림 허용이 거부되었습니다.");
        }
      } catch (error) {
        console.error("알림 권한 요청 중 오류:", error);
        alert("알림 권한 요청 중 오류가 발생했습니다.");
      }
    } else {
      alert("알림이 차단되어 있습니다. 브라우저 설정에서 허용해주세요.");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Push Notification Test</h1>
      <button
        type="button"
        onClick={showNotification}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Push 알림 보내기
      </button>
    </div>
  );
}
