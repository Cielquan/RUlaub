use notify::{self, Watcher};
use tokio::sync::mpsc;

/// Create an async file watcher and a corresponding channel.
#[allow(dead_code)] // TODO:#i# remove after usage
pub fn create_async_watcher() -> anyhow::Result<(
    notify::RecommendedWatcher,
    mpsc::Receiver<notify::Result<notify::Event>>,
)> {
    trace!(
        target = "file_watcher",
        message = "Create async channel for file watcher"
    );
    let (tx, rx) = mpsc::channel(1);

    debug!(
        target = "file_watcher",
        message = "Create async file watcher"
    );
    match notify::RecommendedWatcher::new(move |res| {
        tauri::async_runtime::block_on(async {
            if let Err(err) = tx.send(res).await {
                error!(
                    target = "file_watcher",
                    message = "Failed to send event via channel; Receiver dropped or closed",
                    error = ?err
                );
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
