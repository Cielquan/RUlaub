use notify::{Event, RecommendedWatcher, Watcher};
use tokio::sync::mpsc::{channel, Receiver};

/// Create an async file watcher and a corresponding channel.
#[allow(dead_code)] // TODO:#i# remove after usage
pub fn create_async_watcher(
) -> anyhow::Result<(RecommendedWatcher, Receiver<notify::Result<Event>>)> {
    trace!(
        target = "file_watcher",
        message = "Create async channel for file watcher"
    );
    let (tx, rx) = channel(1);

    debug!(
        target = "file_watcher",
        message = "Create async file watcher"
    );
    match RecommendedWatcher::new(move |res| {
        tauri::async_runtime::block_on(async {
            if let Err(err) = tx.send(res).await {
                error!(
                    target = "file_watcher",
                    message = "Failed to send event via channel; Receiver dropped or closed",
                    error = ?err
                );
                return;
            }
        })
    }) {
        Ok(watcher) => Ok((watcher, rx)),
        Err(err) => {
            error!(
                target = "file_watcher",
                message = "Failed to create file watcher",
                error = ?err
            );
            Err(err.into())
        }
    }
}
