import discord
from discord.ext import commands

class Redirect(commands.Cog):
    def __init__(self, client):
        self.client = client

    @commands.command(name="redirect", description="Select a different pokemon.", category="configuration")
    @commands.has_permissions(manage_messages=True)
    async def redirect(self, ctx, *args):
        guild = await Guild.objects.get(id=ctx.guild.id)
        if not guild:
            server = Guild(id=ctx.guild.id, prefix=None, spawnchannel=None, spawnbtn=False, levelupchannel=None, levelupbtn=None)
            await server.save()

        nguild = await Guild.objects.get(id=ctx.guild.id)
        if not args:
            return await ctx.reply(f"Please specify a channel to redirect spawns using `{nguild.prefix}redirect <channel>` or use `{nguild.prefix}redirect reset` to reset redirect channel.")

        if args[0].lower() == "reset":
            nguild.spawnchannel = None
            await nguild.save()
            return await ctx.send("Removed redirect channel.")

        nchannel = discord.utils.get(ctx.guild.channels, mention=args[0]) or discord.utils.get(ctx.guild.channels, id=args[0]) or discord.utils.find(lambda r: args[0].lower() in r.name.lower(), ctx.guild.channels)
        if not nchannel:
            return await ctx.send(f"Correct usage: **{nguild.prefix or client.config.prefix}redirect <mentionchannel/id/name>**")

        nguild.spawnchannel = nchannel.id
        await nguild.save()
        return await ctx.send(embed=discord.Embed(title="Redirect channel configuration", color=0x00f9ff, description=f"Redirect channel for {ctx.guild.name} has been set to <#{nguild.spawnchannel}>"))

def setup(client):
    client.add_cog(Redirect(client))