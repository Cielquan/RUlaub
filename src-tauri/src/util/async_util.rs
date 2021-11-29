use notify::{Event, RecommendedWatcher, Watcher};
use tokio::sync::mpsc::{channel, Receiver};

pub fn create_async_watcher(
) -> notify::Result<(RecommendedWatcher, Receiver<notify::Result<Event>>)> {
    trace!("Create channel for file watcher.");
    let (tx, rx) = channel(1);

    trace!("Create file watcher.");
    let watcher = RecommendedWatcher::new(move |res| {
        tauri::async_runtime::block_on(async {
            tx.send(res).await.unwrap();
        })
    })?;

    Ok((watcher, rx))
}
