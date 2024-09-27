import { Server, Socket } from "socket.io";
import prisma from "../../prisma/index";

export const commentSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("New user connected:", socket.id);

    socket.on("newComment", async ({ ideaId, user, content }) => {
      try {
        const comment = await prisma.comment.create({
          data: { content, ideaId, user },
        });

        io.emit("commentAdded", comment);
      } catch (error) {
        console.error("Error adding comment:", error);
        socket.emit("error", { message: "Failed to add comment" });
      }
    });

    socket.on("deleteComment", async ({ commentId }) => {
      try {
        await prisma.comment.delete({ where: { id: commentId } });

        io.emit("commentDeleted", commentId);
      } catch (error) {
        console.error("Error deleting comment:", error);
        socket.emit("error", { message: "Failed to delete comment" });
      }
    });

    socket.on("likeIdea", async ({ ideaId }) => {
      try {
        const idea = await prisma.idea.update({
          where: { id: ideaId },
          data: { likes: { increment: 1 } },
        });

        io.emit("ideaLiked", idea);
      } catch (error) {
        console.error("Error liking idea:", error);
        socket.emit("error", { message: "Failed to like idea" });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
