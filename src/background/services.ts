type OnConfirm = () => void;

let notifications: Array<{ id: string; onConfirm: OnConfirm }> = [];

function addNotification(id: string, onConfirm: OnConfirm) {
  notifications.push({
    id,
    onConfirm,
  });
}

function getNotification(id: string) {
  return notifications.find(x => x.id === id);
}

function removeNotification(id: string) {
  notifications = notifications.filter(x => x.id !== id);
}

export function sendNotification(onConfirm: OnConfirm) {
  const title = 'Time to rest your eyes!';
  const message = 'Following a 20-20-20 rule will help keep your eyes healthy!';
  const buttons = [{ title: 'I have rest my eyes' }];

  chrome.notifications.create(
    {
      type: 'basic',
      iconUrl: 'icon.png',
      message,
      title,
      buttons,
    },
    notificationId => {
      addNotification(notificationId, onConfirm);
    }
  );
  console.log('Test send notification.');
}

export function bindNotificationAction() {
  chrome.notifications.onButtonClicked.addListener(
    (notificationId, buttonIndex) => {
      const notification = getNotification(notificationId);
      if (notification) {
        notification.onConfirm();
        removeNotification(notificationId);
      }
    }
  );
}

function getFormattedBadgeText(timeInSeconds: number): string {
  if (timeInSeconds <= 0 || Number.isNaN(timeInSeconds)) {
    return '';
  }

  const roundedTimeInSeconds = Math.round(timeInSeconds);
  const minutes = Math.floor(roundedTimeInSeconds / 60);
  const seconds = Math.floor(roundedTimeInSeconds - minutes * 60);

  if (minutes > 9) {
    return minutes + 'm';
  }

  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${formattedSeconds}`;
}

/**
 * @param remainingTime in seconds
 */
export function setRemainingTimeBadgeText(
  remainingTime: number,
) {
  const badgeText = getFormattedBadgeText(remainingTime);
  chrome.browserAction.setBadgeText({
    text: badgeText,
  });
}

export function setTimeUpBadgeText() {
  chrome.browserAction.setBadgeText({
    text: '0:00',
  });
}

export function clearBadgeText() {
  chrome.browserAction.setBadgeText({
    text: '',
  });
}
